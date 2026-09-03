type qqwe = "a" | "b" | "c";
type MyExclude<T, U> = T extends U ? never : T;
type asd = MyExclude<qqwe, "a">;
type MyAwaited<T> =
  T extends Promise<infer R> ? MyAwaited<R> : T extends Object ? number : T;
type aa = MyAwaited<Promise<Promise<Promise<string | boolean>>>>;
type BrokenPromise = Awaited<{ then: () => 5 }>;

type Concat<T extends any[], U extends any[]> = [...T, ...U];

type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
type asdasd = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">;
type asdasd1 = Includes<[false, 2, 3, 5, 6, 7], false>;
type a = [false, 2, 3, 5, 6, 7][number];
