import {PluginDef, PluginManager} from "@senx/discovery-widgets";
import * as pack from "../package.json"

export default () => {
  PluginManager.getInstance().register(new PluginDef({
    type: 'sensor-gauge',
    name: pack.name,
    tag: 'discovery-plugin-sensor-gauge',
    author: pack.author,
    description: pack.description,
    version: pack.version,
  }));
}
