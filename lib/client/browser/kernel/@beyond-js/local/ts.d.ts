// FILE: ./local
declare namespace ns_local {
    class BeyondLocal {
        #private;

        test(): Promise<void>;

        constructor();
    }

    const local: BeyondLocal;
}

export import BeyondLocal = ns_local.BeyondLocal;
export import local = ns_local.local;
