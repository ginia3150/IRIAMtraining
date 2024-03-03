import React from "react";
import { Menu } from "./types"; // Menuインターフェースのインポート

interface StatisticsProps {
  menus: Menu[];
  totalSpins: number;
}

const Statistics: React.FC<StatisticsProps> = ({ menus, totalSpins }) => {
  return (
    <div>
      <h2>統計</h2>
      <p>ルーレット回数: {totalSpins}回</p>
      {menus.map((menu) => (
        <div key={menu.id}>
          <p>
            {menu.id}: 目標{menu.targetCount}回, 実行{menu.timesCompleted}回,
            合計{menu.targetCount * menu.timesCompleted}回
          </p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
