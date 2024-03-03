import React, { useState } from "react";
import { MenuFormProps } from "./types";

const MenuForm: React.FC<MenuFormProps> = ({ onAddMenu }) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  // 半角数字に変換する関数
  const toHalfWidth = (str) => {
    return str
      .replace(/[！-～]/g, function (tmpStr) {
        // 文字コードをシフト
        return String.fromCharCode(tmpStr.charCodeAt(0) - 0xfee0);
      })
      .replace(/[^0-9]/g, ""); // 数字以外は削除
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // countを半角数字に変換してからparseIntを行う
    const countNumber = parseInt(toHalfWidth(count), 10);
    if (!name.trim() || isNaN(countNumber) || countNumber <= 0) {
      alert("適切なメニュー名と正の回数を入力してください。");
      return;
    }
    onAddMenu(name, countNumber);
    setName("");
    setCount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="メニュー名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text" // type="number"からtype="text"に変更して、任意の文字列を入力できるようにする
        placeholder="目標回数"
        value={count}
        onChange={(e) => setCount(toHalfWidth(e.target.value))} // 入力時に自動で半角数字に変換
      />
      <button type="submit">登録</button>
    </form>
  );
};

export default MenuForm;
