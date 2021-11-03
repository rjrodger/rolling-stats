/* Copyright (c) 2013-2021 Richard Rodger, MIT License */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stats {
    constructor(size, duration, clock) {
        this.head = -1;
        this.count = 0;
        this.sum = 0;
        this.allcount = 0;
        this.allsum = 0;
        this.size = size || 1111;
        this.duration = duration || 60000;
        this.clock = (null == clock ? Date.now : clock);
        this.start = this.clock();
        this.vals = new Array(size);
        this.times = new Array(size);
        this.head = -1;
        this.count = 0;
        this.sum = 0;
        this.allmin = 0;
        this.allmax = 0;
        this.allcount = 0;
        this.allsum = 0;
        this.minrate = 0;
        this.maxrate = 0;
    }
    point(v) {
        if (null == v)
            return;
        let now = this.clock();
        // let cutoff = now - duration
        this.head = (this.head + 1) % this.size;
        if (this.count === this.size) {
            this.sum -= this.vals[this.head];
            this.count--;
        }
        this.vals[this.head] = v;
        this.times[this.head] = now;
        this.count++;
        this.sum += v;
        this.allcount++;
        this.allsum += v;
        this.allmin = null == this.allmin ? v : v < this.allmin ? v : this.allmin;
        this.allmax = null == this.allmax ? v : this.allmax < v ? v : this.allmax;
    }
    calculate() {
        let now = this.clock();
        let cutoff = now - this.duration;
        let i;
        if (0 < this.count) {
            let tail = (this.size + this.head - this.count + 1) % this.size;
            i = 0;
            while (i++ < this.count && this.times[tail] <= cutoff) {
                this.sum -= this.vals[tail];
                this.count--;
                tail = (tail + 1) % this.size;
            }
        }
        let mean = 0 < this.count ? this.sum / this.count : 0;
        let vr = 0, v, min, max;
        for (i = 0; i < this.count; i++) {
            v = this.vals[(this.size + this.head - i) % this.size];
            vr += Math.pow(v - mean, 2);
            min = void 0 === min ? v : v < min ? v : min;
            max = void 0 === max ? v : max < v ? v : max;
        }
        let rate = 1000 * this.count / this.duration;
        this.minrate =
            null == this.minrate ? rate : rate < this.minrate ? rate : this.minrate;
        this.maxrate =
            null == this.maxrate ? rate : this.maxrate < rate ? rate : this.maxrate;
        let out = {
            now: now,
            from: cutoff,
            start: this.start,
            count: this.count,
            sum: this.sum,
            mean: mean,
            min: min,
            max: max,
            stddev: 1 < this.count ? Math.sqrt(vr / (this.count - 1)) : 0,
            rate: rate,
            minrate: this.minrate,
            maxrate: this.maxrate,
            allmin: this.allmin,
            allmax: this.allmax,
            allcount: this.allcount,
            allsum: this.allsum,
            allmean: 0 < this.allcount ? this.allsum / this.allcount : 0,
            allrate: 1000 * this.allcount / (now - this.start)
        };
        return out;
    }
}
function NamedStats(size, duration, clock) {
    let self = Object.create(null);
    let empty = new Stats(1, 1).calculate();
    let map = {};
    self.point = function (v, name) {
        if (null == v || null == name)
            return;
        let stats = (map[name] = (map[name] || new Stats(size, duration, clock)));
        stats.point(v);
    };
    self.calculate = function (name) {
        if (null == name) {
            let out = {};
            for (let n in map) {
                out[n] = map[n].calculate();
            }
            return out;
        }
        let stats = (map[name] = (map[name] || new Stats(size, duration)));
        if (null == stats)
            return empty;
        return stats.calculate();
    };
    self.names = function () {
        let names = [];
        for (let name in map) {
            names.push(name);
        }
        return names;
    };
    return self;
}
const RollingStats = function (size, duration, clock) {
    let stats = new Stats(size, duration, clock);
    return stats;
};
RollingStats.Stats = Stats;
RollingStats.NamedStats = NamedStats;
exports.default = RollingStats;
if ('undefined' !== typeof (module)) {
    module.exports = RollingStats;
}
//# sourceMappingURL=rolling-stats.js.map