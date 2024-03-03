import React, { useState } from "react";
import useLocalStorage from "./useLocalStorage"; // カスタムフックのインポート
import MenuForm from "./MenuForm";
import MenuList from "./MenuList";
import Roulette from "./Roulette";
import Statistics from "./Statistics";
import { Menu } from "./types";

const App: React.FC = () => {
  const [menus, setMenus] = useLocalStorage<Menu[]>("menus", []);
  const [totalSpins, setTotalSpins] = useLocalStorage<number>("totalSpins", 0);
  const [selectedMenuName, setSelectedMenuName] = useState<string | null>(null); // 選択されたメニュー項目の名前

  // メニューを追加する関数
  const addMenu = (name: string, targetCount: number) => {
    const newId = menus.length > 0 ? menus[menus.length - 1].id + 1 : 1; // 最後のメニューのIDに1を加える
    const newMenu = { id: newId, name, targetCount, timesCompleted: 0 };
    setMenus((prevMenus) => [...prevMenus, newMenu]);
  };

  // ルーレットを回す関数（名前を基に処理を行うバージョン）
  const handleSpin = (selectedMenuName: string) => {
    // 選択されたメニューの名前を設定（この行は変更不要）
    setSelectedMenuName(selectedMenuName);

    // 選択されたメニューのtimesCompletedをインクリメント
    setMenus((menus) =>
      menus.map((menu) =>
        menu.name === selectedMenuName
          ? { ...menu, timesCompleted: menu.timesCompleted + 1 }
          : menu
      )
    );
    setTotalSpins((prevTotalSpins) => prevTotalSpins + 1);
  };
  // ローカルストレージをクリアする関数
  const clearLocalStorage = () => {
    localStorage.clear();
    setMenus([]);
    setTotalSpins(0);
  };

  // メニューを更新する関数
  const onUpdateMenu = (updatedMenus: Menu[]) => {
    setMenus(updatedMenus);
  };

  const removeMenu = (menuId: number) => {
    setMenus(menus.filter((menu) => menu.id !== menuId));
  };

  return (
    <div>
      <div>
        {/* 既存のコンポーネントのレンダリング */}
        {selectedMenuName && <p>選択されたメニュー: {selectedMenuName}</p>}{" "}
        {/* 選択されたメニューの名前を表示 */}
      </div>
      <MenuForm onAddMenu={addMenu} />
      <MenuList
        menus={menus}
        onUpdateMenu={onUpdateMenu}
        onRemoveMenu={removeMenu}
      />
      <Roulette menus={menus} onSpin={handleSpin} />
      <Statistics menus={menus} totalSpins={totalSpins} />
      <button onClick={clearLocalStorage}>入力値の初期化</button>
    </div>
  );
};

export default App;
