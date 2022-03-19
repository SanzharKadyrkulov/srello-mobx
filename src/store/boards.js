import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API } from '../helpers/consts';

class Board {
	boards = [];
	constructor() {
		makeAutoObservable(this);
	}
	async fetchBoards() {
		try {
			const { data } = await axios.get(`${API}/boards`);
			this.boards = data;
		} catch (e) {
			console.log(e);
		}
	}
	async addBoard(title) {
		try {
			const board = {
				title,
				items: [],
			};
			await axios.post(`${API}/boards`, board);
			this.fetchBoards();
		} catch (e) {
			console.log(e);
		}
	}
	async deleteBoard(id) {
		try {
			await axios.delete(`${API}/boards/${id}`);
			this.fetchBoards();
		} catch (e) {
			console.log(e);
		}
	}
	async saveBoard(id, board) {
		try {
			await axios.patch(`${API}/boards/${id}`, board);
			this.fetchBoards();
		} catch (e) {
			console.log(e);
		}
	}
}

export default new Board();
