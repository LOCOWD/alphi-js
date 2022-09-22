export function CounterComponent(props) {
  return {
    count: props.initialCount,
    inc() {
      this.count++;
    },
    mounted() {
      window.console.log(`Counter mounted!`);
    },
  };
}
