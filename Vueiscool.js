const app = Vue.createApp({});

app.component("calculate-container", {
  data() {
    return {
      startValue: 20000,
      timeSaving: 10,
      monthlySaving: 1000,
      interestRate: 0.07,
      futureValue: new Intl.NumberFormat("sv-SE").format(213278),
    };
  },

  template: ` <h1 id="header-title">Ränta-på-ränta kalkylator</h1>
  <p>Uträkningen är beräknad på en årsavkastning om cirka 7%.</p>
  <div id="input-container">
    <label>Startvärde</label>
    <div id="input-container1">

    <input v-model="currencyValue">
    <input v-model="startValue" type="range" min="0" max="1000000" @input="calculator">

    </div>
    <label>Tid</label>
    <div id="input-container1">
    <input v-model="timeSaving"  @input="calculator">
    <input v-model="timeSaving" type="range" min="0" max="100" @input="calculator">
    </div>
    <label>Månadssparande</label>
    <div id="input-container1">
    <input v-model="monthlySaving"  @input="calculator">
    <input v-model="monthlySaving" type="range" min="0" max="50000" @input="calculator">
    </div>
  </div>
  <div id="result-container">
  <h3>Resultatet hade genererat dig följande efter {{ timeSaving }} år av sparande:</h3>
  <h3 id="sum-value">{{ futureValue }} kr</h3>
</div>
   `,

  computed: {
    currencyValue: {
      get() {
        return `${this.startValue} kr`;
      },
      set(startValue) {
        console.log("startValue", startValue);

        if (startValue.endsWith(" kr")) {
          const maybeNumber = startValue.substring(0, startValue.length - 3);

          if (!isNaN(maybeNumber)) {
            this.startValue = Number(maybeNumber);
            return;
          }
        }

        this.$refs.currency.value = this.currencyValue;
      },
    },
  },

  methods: {
    calculator() {
      this.futureValue =
        this.startValue *
        Math.pow(1 + this.interestRate / 12, this.timeSaving * 12);
      this.futureValue = new Intl.NumberFormat("sv-SE").format(
        Math.trunc(
          this.futureValue +
            (this.monthlySaving *
              (Math.pow(1 + this.interestRate / 12, this.timeSaving * 12) -
                1)) /
              (this.interestRate / 12)
        )
      );
    },
  },
});

app.mount("#app");
