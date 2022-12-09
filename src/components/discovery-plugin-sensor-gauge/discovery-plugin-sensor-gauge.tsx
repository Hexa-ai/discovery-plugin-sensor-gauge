import { ChartType, ColorLib, DataModel, DiscoveryEvent, GTSLib, Logger, Param, Utils } from '@senx/discovery-widgets';
import { Component, Element, Event, EventEmitter, h, Listen, Method, Prop, State, Watch,getAssetPath } from '@stencil/core';
import * as echarts from 'echarts';

@Component({
  tag: 'discovery-plugin-sensor-gauge',
  styleUrl: 'discovery-plugin-sensor-gauge.css',
  shadow: true,
})



export class DiscoveryPluginSensorGauge {

  @Prop() result: DataModel | string;                 // mandatory, will handle the result of a Warp 10 script execution
  @Prop() type: ChartType;                            // optionnal, to handle the chart type if you want to handle more than one
  @Prop() options: Param | string = new Param();      // mandatory, will handle dashboard and tile option
  @State() @Prop() width: number;                     // optionnal
  @State() @Prop({ mutable: true }) height: number;   // optionnal, mutable because, in this tutorial, we compute it
  @Prop() debug: boolean = false;

  @Event() draw: EventEmitter<void>;                  // mandatory

  @Element() el: HTMLElement;

  @State() innerOptions: Param;               // will handle merged options
  @State() innerResult: DataModel;            // will handle the parsed execution result

  private LOG: Logger;                        // The Discovery Logger
  private divider: number = 1000;             // Warp 10 time unit divider
  private innerStyles: any = {};              // Will handle custom CSS styles for your tile
  private graph: HTMLDivElement;
  private myChart:echarts.ECharts;                    // The ChartJS instance
  private iconPath:string;
  private textColorStyle:string;

  /*
   * Called when the result is updated
   */
  @Watch('result') // mandatory
  updateRes(newValue: DataModel | string, oldValue: DataModel | string) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.innerResult = GTSLib.getData(this.result);
      setTimeout(() => this.drawChart());   // <- we will see this function later
    }
  }

  /*
  * Mandatory
  * Called by Discovery when the component must be resized
  */
  @Method()
  async resize() {
    if (!!this.myChart) {
      this.myChart.resize();
    }
  }

  /*
   * Called when the options are updated
   */
  @Watch('options') // mandatory
  optionsUpdate(newValue: string, oldValue: string) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      if (!!this.options && typeof this.options === 'string') {
        this.innerOptions = JSON.parse(this.options);
      } else {
        this.innerOptions = { ...this.options as Param };
      }
      setTimeout(() => this.drawChart());
    }
  }

   /*
   * Mandatory
   * Part of the lifecycle
   */
   componentWillLoad() {

    //Chart.register(...registerables);                                               // ChartJS specific loading
    this.LOG = new Logger(DiscoveryPluginSensorGauge, this.debug); // init the Discovery Logger
    // parse options
    if (typeof this.options === 'string') {
      this.innerOptions = JSON.parse(this.options);
    } else {
      this.innerOptions = this.options;
    }
    // parse result
    this.innerResult = GTSLib.getData(this.result);
    this.divider = GTSLib.getDivider(this.innerOptions.timeUnit || 'us'); // Warp 10 default time unit
    // Get tile dimensions of the container
    const dims = Utils.getContentBounds(this.el.parentElement);
    this.width = dims.w;
    this.height = dims.h;

  }

  /*
   * Mandatory
   * Part of the lifecycle
   */
  componentDidLoad() {
    //this.graph.innerText='salut'
    this.myChart=echarts.init(this.graph, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    setTimeout(() => this.drawChart());

  }

  drawChart() {
    // Merge options
    let options = Utils.mergeDeep<Param>(this.innerOptions || {} as Param, this.innerResult.globalParams) as Param;
    this.innerOptions = { ...options };
    const labels = [];
    const datasets = [];
    // Flatten the data structure and add an id to GTS
    console.log(ColorLib.getColor(1, this.innerOptions.scheme))
    const gtsList = GTSLib.flattenGtsIdArray(this.innerResult.data as any[], 0).res;

    if (this.innerOptions.extra == undefined) {
      this.innerOptions.extra ={}
    }
    if (this.innerOptions.extra.url==undefined || this.innerOptions.extra.url==null){
      this.innerOptions.extra.url=''
    }

    switch(this.innerOptions.extra.icon) {
      case 'flow':{
        this.iconPath= getAssetPath('assets/flow.svg');
        break;
      }
      case 'temperature':{
        this.iconPath=getAssetPath('assets/temperature.svg');
        break;
      }
      case 'fan':{
        this.iconPath=getAssetPath('assets/fan.svg');
        break;
      }
    }
    let option = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.innerOptions.extra.minValue,
          max: this.innerOptions.extra.maxValue,
          splitNumber: this.innerOptions.extra.splitNumber,
          itemStyle: {
            color: this.innerOptions.extra.color!=undefined ? this.innerOptions.extra.color: ColorLib.getColor(4, this.innerOptions.scheme)
          },
          progress: {
            roundCap:false,
            show: true,
            width: 30
          },
          pointer: {
            show: false
          },
          axisLine: {
            roundCap:false,
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: this.innerOptions.fontColor!=undefined ? this.innerOptions.fontColor: ColorLib.getColor(0, this.innerOptions.scheme)
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: this.innerOptions.fontColor!=undefined ? this.innerOptions.fontColor: ColorLib.getColor(0, this.innerOptions.scheme)
            }
          },
          axisLabel: {
            distance: -15,
            color: this.innerOptions.fontColor!=undefined ? this.innerOptions.fontColor: ColorLib.getColor(0, this.innerOptions.scheme),
            fontSize: 18
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '20%'],
            fontSize: 25,
            fontWeight: 'bolder',
            formatter: '{value} ' + this.innerOptions.unit,
            color: this.innerOptions.fontColor!=undefined ? this.innerOptions.fontColor: ColorLib.getColor(0, this.innerOptions.scheme)
          },
          data: [
            {
              value: this.innerResult.data[0].value
            }
          ]
        }
      ]
    };
    console.log(options)
    this.myChart.setOption(option)
    setTimeout(()=>{this.myChart.resize() })
    ;







    // For each GTS
    // gtsList.forEach((gts, i) => {
    //   // if the GTS is a list of values
    //   if (GTSLib.isGtsToPlot(gts)) {
    //     const data = [];
    //     // Compute the GTS color
    //     const c = ColorLib.getColor(gts.id || i, this.innerOptions.scheme);
    //     const color = ((this.innerResult.params || [])[i] || { datasetColor: c }).datasetColor || c;
    //     // For each value
    //     gts.v.forEach(d => {
    //       // Handle date depending on the timeMode and the timeZone
    //       const date = GTSLib.utcToZonedTime(d[0], this.divider, this.innerOptions.timeZone);
    //       const dateLabel = (this.innerOptions.timeMode || 'date') === 'date'
    //         ? GTSLib.toISOString(GTSLib.zonedTimeToUtc(date, 1, this.innerOptions.timeZone), 1, this.innerOptions.timeZone, this.innerOptions.timeFormat)
    //           .replace('T', '\n').replace(/\+[0-9]{2}:[0-9]{2}$/gi, '')
    //         : date;
    //       // add the label
    //       if (!labels.includes(dateLabel)) {
    //         labels.push(dateLabel);
    //       }
    //       // add the value
    //       data.push(d[d.length - 1]);
    //     });
    //     // add the dataset
    //     datasets.push({
    //       label: ((this.innerResult.params || [])[i] || { key: undefined }).key || GTSLib.serializeGtsMetadata(gts),
    //       data,
    //       borderColor: color,
    //       backgroundColor: ColorLib.transparentize(color, 0.5)
    //     })
    //   }
    // });
    // if (!!this.chartElement) {
    //   const ctx = this.chartElement.getContext('2d');
    //   if (!this.myChart) {
    //     this.myChart = new Chart(ctx, {
    //       type: 'radar',
    //       data: { labels, datasets },
    //       options: {
    //         animation: false,
    //         responsive: true,
    //         maintainAspectRatio: false
    //       }
    //     });
    //   } else {
    //     this.myChart.data = { labels, datasets };
    //     this.myChart.update();
    //   }
    // }
  }

  /*
   * Mandatory
   * Render the content of the component
   */
  render() {
    return (
      <div class="main-container">
        <a href={this.innerOptions.extra.url} class={this.innerOptions.extra.url!=''? '':'disabled'}>
        <div ref={(el) => this.graph = el} class="chart-container"></div>
        <img src={this.iconPath} class={this.innerOptions.extra.icon=='fan' && this.innerResult.data[0].value!=0 ? 'icon rotate':'icon'} />
        <div class={this.innerOptions.extra.alertBlink==true?'alert blink':'alert'} style={{'color': this.innerOptions.extra.alertFontColor!=undefined ? this.innerOptions.extra.alertFontColor: ColorLib.getColor(5, this.innerOptions.scheme),'background-color': this.innerOptions.extra.alertBgColor!=undefined ? this.innerOptions.extra.alertBgColor: 'transparent'  }} >
            <p>
            {this.innerResult.data[0].alertMessage}
            </p>
        </div>
        </a>
      </div>
    );
  }

}
