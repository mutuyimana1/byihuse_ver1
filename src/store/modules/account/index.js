const state = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    assignedDepartments: '',
    token: ''
}

const getters = {
    firstName: state => {
        return state.firstName;
    },
    lastName: state => {
        return state.lastName;
    },
    email: state => {
        return state.email;
    },
    role: state => {
        return state.role;
    },
    assignedDepartments: state => {
        return state.assignedDepartments;
    },
}

const actions = {
}

const mutations = {
}

export default {
	state,
	getters,
	actions,
	mutations
}