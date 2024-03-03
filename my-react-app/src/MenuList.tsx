import React, { useState } from "react";
import { Menu } from "./types";

interface MenuListProps {
  menus: Menu[];
  onUpdateMenu: (menus: Menu[]) => void;
  onRemoveMenu: (id: number) => void; // 削除関数を受け取るためのprops
}

const MenuList: React.FC<MenuListProps> = ({ menus, onUpdateMenu, onRemoveMenu }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editTargetCount, setEditTargetCount] = useState<number>(0);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditName(menus[index].name);
    setEditTargetCount(menus[index].targetCount);
  };

  const handleSaveClick = () => {
    if (editIndex !== null && editName.trim() !== "" && editTargetCount > 0) {
      const updatedMenus = [...menus];
      updatedMenus[editIndex] = {
        ...updatedMenus[editIndex],
        name: editName,
        targetCount: editTargetCount,
      };
      onUpdateMenu(updatedMenus);
      setEditIndex(null);
      setEditName("");
      setEditTargetCount(0);
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditName("");
    setEditTargetCount(0);
  };

  return (
    <ul>
      {menus.map((menu, index) => (
        <li key={menu.id}> {/* キーをメニューのIDに変更 */}
          {editIndex === index ? (
            <div>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="number"
                value={editTargetCount}
                onChange={(e) => setEditTargetCount(Number(e.target.value))}
              />
              <button onClick={handleSaveClick}>保存</button>
              <button onClick={handleCancelClick}>キャンセル</button>
            </div>
          ) : (
            <div>
              {menu.name} - {menu.targetCount}回
              <button onClick={() => handleEditClick(index)}>編集</button>
              <button onClick={() => onRemoveMenu(menu.id)}>削除</button> {/* 削除ボタンの追加 */}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
