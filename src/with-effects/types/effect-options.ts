export type EffectOptions<A> = {
  id?: string;
  filter?: (action: A) => boolean;
  cancelPrevious?: boolean;
};
