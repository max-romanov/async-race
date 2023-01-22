import {defineStore} from 'pinia'
import type {ICar} from '../interfaces/ICar'
import type {IWinner} from '@/interfaces/IWinner'
import type {IExtendedCar} from "@/interfaces/IExtendedCar";

interface IStoreStates {
  garage: ICar[] | null
  winners: IWinner[] | null
  cars: IExtendedCar[] | null
  chosenCar: IExtendedCar | null
}

export const useBaseStore = defineStore('baseStore', {
  state: (): IStoreStates => ({
    garage: null,
    winners: null,
    cars: null,
    chosenCar: null
  }),
  actions: {
    async setGarage() {
      try {
        const res = await fetch('http://localhost:3000/garage')
        this.garage = await res.json()
        if (this.garage) {
          this.cars = this.garage.map(it => {
            return {
              ...it,
              isMoving: false
            }
          })
        }
        console.log(this.garage)
      } catch (e) {
        console.log(e)
      }
    },

    async setWinners() {
      try {
        const res = await fetch('http://localhost:3000/winners')
        this.winners = await res.json()
      } catch (e) {
        console.log(e)
      }
    },

    async setData() {
      await this.setGarage()
      await this.setWinners()
    },

    async createCar(name: string, color: string) {
      console.log({name, color})
      try {
        console.time("createCar")
        const res = await fetch('http://localhost:3000/garage', {
          method: 'POST',
          body: JSON.stringify({name, color}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()
        if (this.cars) {
          const car = data
          car.isMoving = false
          this.cars.push(car)
          console.timeEnd("createCar")
        }
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    setCurrentCar(car: IExtendedCar) {
      this.chosenCar = car
    },

    async getWinner(id: number) {
      const res = await fetch(`http://localhost:3000/winners/${id}`)
      return res.json()
    },

    async startCar(id: number): Promise<{ velocity: number, distance: number } | null> {
      if (!this.cars) {
        return null
      }
      const res = await fetch(`http://localhost:3000/engine?id=${id}&status=started`, {
        method: "PATCH"
      })
      return await res.json()
    },

    async driveCar(id: number) {
      if (!this.cars) {
        return
      }
      console.log(`drive mode ${id}`)
      try {
        const res = await fetch(`http://localhost:3000/engine?id=${id}&status=drive`, {
          method: "PATCH",
        })
        console.log("fetch")
        return await res.text()
      } catch (e) {
        console.log(e)
      }
    },

    stopCar(id: number) {
      if (this.cars && this.cars[id - 1].isMoving) {
        this.cars[id - 1].isMoving = false
        return
      }
    },

    getCar(id: number): {car: IExtendedCar, indexInArr: number} | null {
      if (!this.cars) {
        return null
      }

      const car = this.cars.find((car, indx) => {
        return car.id === id
      })

      if (car) {
        return {
          car,
          indexInArr: this.cars.indexOf(car),
        }
      }
      return null
    },

    startAll() {
      if (this.cars) {
        this.cars = this.cars.map(car => {
          return {
            ...car,
            isMoving: true,
          }
        })
      }
    },

    stopAll() {
      if (this.cars) {
        this.cars = this.cars.map(car => {
          return {...car, isMoving: false}
        })
      }
    },

    async removeCar(id: number) {
      const car = this.getCar(id)
      if (car) {
        await fetch(`http://localhost:3000/garage/${id}`, {
          method: "DELETE"
        })
        await this.setData()
        console.log(this.cars)
      }
    },


  },
})

// const a=async()=>{
//   const res = await fetch(`http://localhost:3000/engine?id=1&status=started`, {
//     method: "PATCH"
//   })
//   const data = await res.json()
//   console.log(data)
//
//   const res1 = await fetch(`http://localhost:3000/engine?id=1&status=drive`, {
//     method: "PATCH"
//   })
//   const data1 = await res1.json()
//   console.log("data2", data1)
//
// }
// await a()
