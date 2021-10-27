import BaseService from './BaseService';

class UserService extends BaseService {
    getUsers(pageNumber = 1) {
        return this.get(`/users?page=${pageNumber}`).then(response => {
            return response
        })
    }
    deleteUser(userID) {
        return this.get(`/users/${userID}`).then(response => {
            return response
        })
    }
    addUser(userDetails) {
        const userData = {
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            email: userDetails.email,
            avatar: userDetails.avatar
        }
        return this.post(`/users/`,userData).then(response => {
            return response
        })
    }
    updateUser(userDetails) {
        return this.put(`/users/${ userDetails.id }`,userDetails).then(response => {
            return response
        }) 
    }
}
export default UserService