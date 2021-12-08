import axios from "axios";
import { makeAutoObservable } from "mobx";

class Board {
  boards = [];
  constructor() {
    makeAutoObservable(this);
  }
  async fetchBoards() {
    try {
      const { data } = await axios.get("http://localhost:8000/boards");
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
      await axios.post("http://localhost:8000/boards", board);
      this.fetchBoards();
    } catch (e) {
      console.log(e);
    }
  }
  async deleteBoard(id) {
    try {
      await axios.delete(`http://localhost:8000/boards/${id}`);
      this.fetchBoards();
    } catch (e) {
      console.log(e);
    }
  }
  async saveBoard(id, board) {
    try {
      await axios.patch(`http://localhost:8000/boards/${id}`, board);
      this.fetchBoards();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Board();
