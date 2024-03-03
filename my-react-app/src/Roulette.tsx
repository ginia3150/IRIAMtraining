import React from "react";
import "./Roulette.css";
import { Menu } from "./types"; // Menuインターフェースのインポート

// propsの型定義を追加して、TypeScriptの恩恵を受けます
interface RouletteProps {
  menus: Menu[];
  onSpin: (selectedMenuName: string) => void;
}

const Roulette: React.FC<RouletteProps> = ({ menus, onSpin }) => {
  const spinRoulette = () => {
    // menus配列が空または未定義の場合の処理を追加
    if (!menus || menus.length === 0) {
      console.log("メニューがありません。");
      return;
    }

    const randomIndex = Math.floor(Math.random() * menus.length);
    const selectedMenu = menus[randomIndex];

    // selectedMenuがundefinedでないことを確認
    if (selectedMenu) {
      onSpin(selectedMenu.name);
    } else {
      console.error("選択されたメニューが見つかりません。");
    }
  };

  return <button onClick={spinRoulette}>ルーレットを回す</button>;
};

export default Roulette;
