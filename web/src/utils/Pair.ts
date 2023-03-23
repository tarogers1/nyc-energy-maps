export default class Pair<K, V> {
  first: K;
  second: V;

  constructor(first: K, second: V) {
    this.first = first;
    this.second = second;
  }

  get() {
    return [this.first, this.second];
  }

  output() {
    console.log(this.first + " " + this.second);
  }
}