import { Plugin } from "obsidian";
import { registerOutlineCommands } from "./outline/registerOutlineCommands";

export default class ObsidianToolkitPlugin extends Plugin {
  async onload() {
    registerOutlineCommands(this);
  }
}
