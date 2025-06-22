import { Listener } from "./listener";
import { Selector } from "./selector";

export type Subscription<T, R = T> = {
  listener: Listener<R>;
  selector?: Selector<T, R>;
};
