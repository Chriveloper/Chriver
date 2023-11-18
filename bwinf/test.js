class Spalte {
    constructor(breite, segmente) {
        this.breite = breite;
        this.segmente = segmente;
    }

    apply(input) {
        const output = new Array(this.breite).fill(false);
        const outputBuilder = (id, data) => {
            output[id] = data[0];
            output[id + 1] = data[1];
        };
        for (let id = 0; id < this.breite; id++) {
            const segment = this.segmente[id];
            if (!segment) continue;

            switch (segment) {
                case BausteinSegmentEnum.r:
                    outputBuilder(id, BausteinType.ROT_UNTEN.lichter(input[id++], input[id]));
                    break;
                case BausteinSegmentEnum.R:
                    outputBuilder(id, BausteinType.ROT_OBEN.lichter(input[id++], input[id]));
                    break;
                case BausteinSegmentEnum.W:
                    outputBuilder(id, BausteinType.WEISS.lichter(input[id++], input[id]));
                    break;
                case BausteinSegmentEnum.B:
                    outputBuilder(id, BausteinType.BLAU.lichter(input[id++], input[id]));
                    break;
                case BausteinSegmentEnum.X:
                    output[id] = false;
                    break;
            }
        }
        return output;
    }
}

class Baustein {
    lichter(oben, unten) {
        throw new Error('lichter method must be implemented by subclasses');
    }
}

class Rot extends Baustein {
    constructor(oben) {
        super();
        this.oben = oben;
    }

    lichter(oben, unten) {
        const b = !(this.oben ? oben : unten);
        return [b, b];
    }
}

class Weiss extends Baustein {
    lichter(oben, unten) {
        const b = !(oben && unten);
        return [b, b];
    }
}

class Blau extends Baustein {
    lichter(oben, unten) {
        return [oben, unten];
    }
}

class BausteinType {
    static ROT_OBEN = new Rot(true);
    static ROT_UNTEN = new Rot(false);
    static BLAU = new Blau();
    static WEISS = new Weiss();
}

class BausteinSegment {
    constructor(string) {
        this.string = string;
    }

    toString() {
        return this.string;
    }
}

const BausteinSegmentEnum = {
    r: new BausteinSegment("r"),
    R: new BausteinSegment("R"),
    W: new BausteinSegment("W"),
    B: new BausteinSegment("B"),
    X: new BausteinSegment("X")
};

let spalte = new Spalte(2, [BausteinSegmentEnum.R, BausteinSegmentEnum.r]);
console.log(spalte)

let output = spalte.apply([false, false]);

console.log(output);