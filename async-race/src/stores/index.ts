import {defineStore} from 'pinia'
import type {ICar} from '../interfaces/ICar'
import type {IWinner} from '@/interfaces/IWinner'
import type {IExtendedCar} from "@/interfaces/IExtendedCar";
import {generateRandomCars} from "@/common/generateRandomCars/generateRandomCars";

interface IStoreStates {
  garage: ICar[] | null
  winners: IWinner[] | null
  cars: IExtendedCar[] | null
  currentCars: IExtendedCar[]
  currentPage: number
}

export const useBaseStore = defineStore('baseStore', {
  state: (): IStoreStates => ({
    garage: null,
    winners: null,
    cars: null,
    currentCars: [],
    currentPage: 1,
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
      try {
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
        }
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },

    async getWinner(id: number) {
      const res = await fetch(`http://localhost:3000/winners/${id}`)
      return res.json()
    },

    async startCar(id: number): Promise<{ velocity: number, distance: number } | undefined> {
      if (!this.cars) {
        return
      }
      try {
        const res = await fetch(`http://localhost:3000/engine?id=${id}&status=started`, {
          method: "PATCH"
        })
        return await res.json()
      } catch (err) {
        console.log(err)
      }
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

    startRace() {
      if (this.currentCars) {
        this.currentCars = this.currentCars.map(car => ({...car, isMoving: true}))
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

    async updateCar(id: number, newName: string, newColor: string) {
      try {
        const res = await fetch(`http://localhost:3000/garage/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: newName,
            color: newColor
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        await this.getCars(this.currentPage, 7)
        await this.setData()
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },

    async generateRandomCars(amount: number) {
      const cars = generateRandomCars(amount)

      for (let i = 0; i < cars.length; i++) {
        const { name, color } = cars[i]

        await this.createCar(name, color)
      }
    },

    async getCars(page: number, limit: number): Promise<IExtendedCar[] | undefined> {
      try {
        const res = await fetch(`http://localhost:3000/garage?_page=${page}&_limit=${limit}`)
        const data = await res.json()
        if (data instanceof Array<ICar>) {
          const cars: IExtendedCar[] = data.map(car => ({...car, isMoving: false}))
          console.log(cars)
          this.currentCars = cars
          return cars
        }
      } catch (e) {
        console.log(e)
      }
    }
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
