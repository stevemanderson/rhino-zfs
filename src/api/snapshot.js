module.exports = class Snapshot {
  constructor(name, used, avail, refer, type, mountpoint) {
    this.name = name;
    this.used = used;
    this.avail = avail;
    this.refer = refer;
    this.type = type;
    this.mountpoint = mountpoint;
  }
};
