declare class Stats {
    size: number;
    duration: number;
    clock: () => number;
    start: number;
    vals: number[];
    times: number[];
    head: number;
    count: number;
    sum: number;
    allmin: number;
    allmax: number;
    allcount: number;
    allsum: number;
    minrate: number;
    maxrate: number;
    constructor(size: number, duration: number, clock?: () => number);
    point(v: number): void;
    calculate(): {
        now: number;
        from: number;
        start: number;
        count: number;
        sum: number;
        mean: number;
        min: number | undefined;
        max: number | undefined;
        stddev: number;
        rate: number;
        minrate: number;
        maxrate: number;
        allmin: number;
        allmax: number;
        allcount: number;
        allsum: number;
        allmean: number;
        allrate: number;
    };
}
declare function NamedStats(size: number, duration: number, clock: () => number): any;
declare const RollingStats: {
    (size: number, duration: number, clock?: (() => number) | undefined): Stats;
    Stats: typeof Stats;
    NamedStats: typeof NamedStats;
};
export default RollingStats;
