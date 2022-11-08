const {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc
} = require('firebase/firestore')

const userController = {

  async createUser (req, res) {
    try {
      const payload = req.body

      const db = getFirestore()

      await addDoc(collection(db, 'users'), payload)

      res.status(201).json({
        success: true,
        data: payload
      })

    } catch (error) {
      res.state(500).json({
        success: false,
        message: error?.message
      })
      console.error(error)
    }
  },

  async getAllUser (req, res) {
    try {
      const db = getFirestore()

      const response = await getDocs(collection(db, 'users'))

      const data = []

      response.forEach((doc) => data.push({
        id: doc.id,
        ...doc.data()
      }))

      res.status(200).json({
        success: true,
        data
      })

    } catch (error) {
      res.state(500).json({
        success: false,
        message: error?.message
      })
      console.error(error)
    }
  },

  async getOneUser (req, res) {
    try {
      const { id } = req.params

      const db = getFirestore()

      const response = await getDoc(doc(db, 'users', id))

      res.status(200).json({
        success: true,
        data: {
          id: response.id,
          ...response.data()
        }
      })
    } catch (error) {
      res.state(500).json({
        success: false,
        message: error?.message
      })
      console.error(error)
    }
  },

  async updateUser (req, res) {
    try {
      const { id } = req.params
      const payload = req.body

      const db = getFirestore()

      await setDoc(doc(db, 'users', id), payload)

      res.status(200).json({
        success: true,
        data: payload
      })
    } catch (error) {
      res.state(500).json({
        success: false,
        message: error?.message
      })
      console.error(error)
    }
  },

  async deleteUser (req, res) {
    try {
      const { id } = req.params

      const db = getFirestore()

      await deleteDoc(doc(db, 'users', id))

      res.status(200).json({
        success: true,
        message: `delete user id ${id}`
      })
    } catch (error) {
      res.state(500).json({
        success: false,
        message: error?.message
      })
      console.error(error)
    }
  }

}

module.exports = userController
