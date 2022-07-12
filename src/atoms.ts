import { atom } from "recoil";

const localStorageEffect =
  (key: string) =>
  <T>({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: T, _: any, isReset: boolean): void => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
  effects: [localStorageEffect("isDark")],
});
