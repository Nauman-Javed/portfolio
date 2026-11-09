import { bindsCfg } from "./binds";

// Hardcoded CS2 config. Edit the values here; the page reads everything from
// this file (search, sections, copy buttons).

export type Row = [label: string, value: string, opts?: { accent?: boolean }];
export type JsonValue = string | number | boolean | { [k: string]: JsonValue };

export type Section =
  | { id: string; title: string; path: string; kind: "list"; rows: Row[] }
  | {
      id: string;
      title: string;
      path: string;
      kind: "json";
      file: string;
      data: { [k: string]: JsonValue };
    }
  | { id: string; title: string; path: string; kind: "line"; value: string }
  | {
      id: string;
      title: string;
      path: string;
      kind: "text";
      file: string;
      lines: string[];
    };

export const player = {
  name: "H3adShOt",
  rank: "19K",
  updated: "09.11.2026",
  faceit: "LVL 10",
  steamUrl: "https://steamcommunity.com/id/H3adShOt_841/",
  faceitUrl: "https://www.faceit.com/en/players/H34D_ShOT",
  crosshairCode: "CS2cSsYJAhMAKbjtSqS6WnvkNb6TiuufGmGxQqNWfQZASc",
  sensitivity: 1,
  dpi: 400,
};

export const sections: Section[] = [
  {
    id: "mouse",
    title: "Mouse",
    path: "Settings › Keyboard / Mouse",
    kind: "list",
    rows: [
      ["Sensitivity", "1.00"],
      ["Zoom sensitivity multiplier", "1.00"],
      ["DPI", "400"],
      ["eDPI", "400", { accent: true }],
      ["cm / 360°", "103.9 cm"],
      ["Polling rate", "1000 Hz"],
      ["Windows sensitivity", "6 / 11"],
      ["Enhance pointer precision", "Off"],
    ],
  },
  {
    id: "crosshair",
    title: "Crosshair",
    path: "Console",
    kind: "json",
    file: "crosshair.json",
    data: {
      cl_crosshairstyle: 4,
      cl_crosshairsize: 1.555596,
      cl_crosshairthickness: 1,
      cl_crosshairalpha: 255,
      cl_crosshairdot: false,
      cl_crosshair_t: false,
      cl_crosshair_gap: 2,
      cl_crosshair_length: 3,
      cl_crosshair_thickness: 2,
      cl_crosshair_recoil: false,
      cl_crosshair_drawoutline: 0,
      cl_crosshairoutline_r: 0,
      cl_crosshairoutline_g: 0,
      cl_crosshairoutline_b: 0,
      cl_crosshairoutline_a: 255,
      cl_crosshaircolor_r: 255,
      cl_crosshaircolor_g: 249,
      cl_crosshaircolor_b: 0,
      cl_crosshaircolor_a: 255,
      cl_crosshair_dynamic_maxdist_splitratio: 0.3,
      cl_crosshair_dynamic_splitalpha_innermod: 1,
      cl_crosshair_dynamic_splitalpha_outermod: 0.45,
      cl_crosshair_dynamic_splitdist: 6,
      cl_crosshair_dynamic_spread_limit: 227,
      cl_crosshair_screen_height: 960,
      cl_crosshair_sniper_width: 2,
      share_code: "CS2cSsYJAhMAKbjtSqS6WnvkNb6TiuufGmGxQqNWfQZASc",
    },
  },
  {
    id: "video",
    title: "Video",
    path: "Settings › Video",
    kind: "list",
    rows: [
      ["Display mode", "Fullscreen"],
      ["Resolution", "1280 × 960"],
      ["Aspect ratio", "Normal 4:3"],
      ["Refresh rate", "180 Hz"],
      ["Wait for vertical sync", "Disabled"],
      ["NVIDIA Reflex low latency", "Enabled"],
      ["Max FPS in game", "723"],
      ["Fullscreen gamma", "1.99"],
      ["Multisampling anti-aliasing", "4× MSAA"],
      ["Global shadow quality", "Low"],
      ["Dynamic shadows", "Sun only"],
      ["Texture detail", "Low"],
      ["Texture filtering mode", "Anisotropic 2×"],
      ["Shader detail", "Low"],
      ["Particle detail", "Low"],
      ["Ambient occlusion", "Disabled"],
      ["High dynamic range", "Performance"],
      ["FidelityFX Super Resolution", "Disabled"],
    ],
  },
  {
    id: "keybinds",
    title: "Keybinds",
    path: "Settings › Keyboard / Mouse",
    kind: "json",
    file: "keybinds.json",
    data: {
      movement: {
        W: "+forward",
        SPACE: "+jump",
        MWHEELDOWN: "+jump",
        SHIFT: "+duck",
        CTRL: "+sprint",
      },
      weapons: {
        MOUSE1: "+attack",
        MOUSE2: "+attack2",
        "3": "slot3",
        "4": "slot4",
        "5": "slot5",
        MWHEELUP: "invprev",
        E: "+use",
        MOUSE4: "use weapon_c4;drop",
        KP_MULTIPLY: "slot12",
      },
      grenades: {
        "7": "slot6",
        X: "slot8",
        Z: "slot10",
      },
      throw_scripts: {
        L: "+runthrow;+throwaction",
        N: "+jumpaction;+throwaction;",
        H: "+jumpaction;+throwaction;",
      },
      buy: {
        KP_0: "buy molotov;buy incgrenade;",
        KP_1: "buy ak47;buy m4a1;",
        KP_2: "buy famas;buy galilar;",
        KP_3: "buy mac10;buy mp9;",
        KP_4: "buy tec9;buy fiveseven;",
        KP_5: "buy deagle;",
        KP_6: "buy awp;",
        KP_7: "buy smokegrenade;",
        KP_8: "buy flashbang;",
        KP_9: "buy hegrenade;",
        KP_PLUS: "buy ssg08;",
        KP_ENTER: "buy p250;",
        KP_DEL: "buy decoy;",
        INSERT: "buy tec9;buy fiveseven;",
        DEL: "buy ak47;buy m4a1;",
        HOME: "buy deagle;",
        PGUP: "buy awp;",
        PGDN: "buy mac10;buy mp9;",
        UPARROW: "buy vesthelm;buy vest;",
        LEFTARROW: "buy defuser;",
        DOWNARROW: "buy taser;",
        RIGHTARROW: "buy vest;",
        BACKSPACE: "buy molotov;buy incgrenade;",
        SCROLLLOCK: "buy flashbang;",
        END: "buy famas;buy galilar;",
        PAUSE: "buy hegrenade;",
        PRINTSCREEN: "buy smokegrenade;",
      },
      comms: {
        V: "+voicerecord",
        KP_DIVIDE: "radio",
        "=": "radio1",
        "]": "say ツ",
      },
      volume: {
        "'": "volume 0.4",
        ".": "volume 0",
        "/": "volume 0.1",
      },
      system: {
        "`": "toggleconsole",
        P: "exec autoexec",
        F: "r_cleardecals",
        ALT: "noclip",
        "\\": "disconnect",
      },
    },
  },
  {
    id: "viewmodel",
    title: "Viewmodel",
    path: "Console",
    kind: "json",
    file: "viewmodel.json",
    data: {
      viewmodel_fov: 68,
      viewmodel_offset_x: 1.5,
      viewmodel_offset_y: 2,
      viewmodel_offset_z: -2,
      viewmodel_presetpos: 0,
      viewmodel_recoil: 1,
    },
  },
  {
    id: "launch",
    title: "Launch options",
    path: "Steam › Properties › Launch options",
    kind: "line",
    value: "+exec binds.cfg",
  },
  {
    id: "config",
    title: "Config",
    path: "cfg › binds.cfg",
    kind: "text",
    file: "binds.cfg",
    lines: bindsCfg.trim().split("\n"),
  },
  {
    id: "audio",
    title: "Audio",
    path: "Settings › Audio",
    kind: "list",
    rows: [
      ["Master volume", "40%"],
      ["Voice volume", "30%"],
      ["Voice chat", "Enabled"],
      ["Mute enemy team", "No"],
      ["Perspective correction", "Yes"],
      ["Play audio when in background", "Yes"],
      ["Main menu music volume", "0%"],
      ["MVP music volume", "0%"],
      ["Round start volume", "0%"],
      ["Round end volume", "0%"],
      ["Round action volume", "0%"],
      ["Death camera music volume", "0%"],
      ["Ten-second warning volume", "4%"],
    ],
  },
  {
    id: "hud",
    title: "HUD and radar",
    path: "Settings › Game",
    kind: "list",
    rows: [
      ["HUD scale", "1.00"],
      ["HUD colour", "Default"],
      ["Show target ID", "Yes"],
      ["Radar HUD scale", "1.00"],
      ["Radar map zoom", "0.30"],
      ["Radar background opacity", "63%"],
      ["Radar blur background", "Yes"],
      ["Radar centres the player", "Yes"],
      ["Radar is rotating", "Yes"],
      ["Toggle shape with scoreboard", "Yes"],
    ],
  },
  {
    id: "gear",
    title: "Gear",
    path: "Hardware",
    kind: "list",
    rows: [
      ["Mouse", "Attack Shark X3"],
      ["Keyboard", "Attack Shark K86"],
      ["Monitor", "MSI G255F · 24″ · 180 Hz"],
      ["Headset", "Bloody"],
      ["Controller", "Easy SMX X05"],
      ["Mousepad", "Razer Goliathus"],
    ],
  },
];
