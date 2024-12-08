const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING
  #result = undefined
  #handlers = []

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }
    try {
      executor(resolve, reject)
    }
    catch (err) {
      reject(err)
    }

  }

  #changeState(state, result) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = result
  }

  #isPromise(value) {
    if (value !== null && (typeof value === 'function' || typeof value === 'object')) {
      return typeof value.then === 'function'
    }
    return false
  }

  #runMicroTask(func) {
    //node
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func)
    } else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func)
      const textNode = document.createTextNode('origin')
      ob.observe(textNode, {
        characterData: true
      })

      textNode.data = 'change'
    } else {
      setTimeout(func, 0);
    }

  }

  #runResult(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback === 'function') {
        try {
          const data = callback(this.#result)

          if (this.#isPromise(data)) {
            data.then(resolve, reject)
          } else {
            resolve(data)
          }

        }
        catch (err) {
          reject(err)
        }
      } else {
        const result = this.#state === FULFILLED ? resolve : reject
        result(this.#result)
      }
    })

  }

  #run() {
    if (this.#state === PENDING) return

    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()

      if (this.#state === FULFILLED) {
        this.#runResult(onFulfilled, resolve, reject)
      } else if (this.#state === REJECTED) {
        this.#runResult(onRejected, resolve, reject)
      }
    }

  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })

      this.#run()
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(1)
})

p.then(
  (res) => {
    console.log('promise finish', res)
  },

  (err) => {
    console.log('promise failed', err)
  }
)