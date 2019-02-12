var app = new Vue({
  el: "#app",
  data: {
    message: "Snake Snake Snake Snake Snake"
  },
  methods: {
    slowReplace: async function(word) {
      return new Promise(resolve => {
        setTimeout(() => {
          let result = word.replace("S", "🐍");
          resolve(result);
        }, 1000);
      });
    },
    reset: function() {
      this.message = "Snake Snake Snake Snake Snake";
    },
    run: async function() {
      this.message = "(running)";
      let result = "";
      // Wait on each promise to be resolved in serial.
      result += await this.slowReplace("Snake ");
      result += await this.slowReplace("Snake ");
      result += await this.slowReplace("Snake ");
      result += await this.slowReplace("Snake ");
      result += await this.slowReplace("Snake");
      this.message = result;
      console.log(result);
    },
    runParallel: async function() {
      this.message = "(running)";
      let result = "";
      // Put all the promises in an array.
      let promises = [];
      promises.push(this.slowReplace("Snake ")); //appebd into lst
      promises.push(this.slowReplace("Snake "));
      promises.push(this.slowReplace("Snake "));
      promises.push(this.slowReplace("Snake "));
      promises.push(this.slowReplace("Snake"));
      // Wait until all promises in the array have been fulfilled.
      let allResults = await Promise.all(promises);
      // In for loops, 'in' gives you each array index and 'of' gives you each array item.
      for (let eachResponse of allResults) {
        result = result + eachResponse;
      }
      this.message = result;
    }
  }
});
