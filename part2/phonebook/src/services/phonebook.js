import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const add = newObj => {
    return axios.post(baseUrl, newObj).then(res => res.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (person, newNumber) => {
    const updatedPerson = { ...person, number: newNumber }
    return axios.put(`${baseUrl}/${person.id}`, updatedPerson).then(res => res.data)
}

export default { getAll, add, remove, update }