/*
 * @Author: cui<devcui@outlook.com>
 * @LastEditors: cui<devcui@outlook.com>
 * @Date: 2022-09-21 11:03:34
 * @LastEditTime: 2022-09-21 11:39:47
 * @FilePath: \custom-chart-plugins\common\utils.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cui<devcui@outlook.com>, All Rights Reserved. 
 */
(function () {
    // 查询配置的维度
    window["findGroups"] = function (options, index) {
        var groups = [];
        for (var i = 0; i < options.config.datas.length; i++) {
            if (options.config.datas[i].type === "group") {
                groups.push(options.config.datas[i])
            }
        }
        if (groups && groups.length > 0) {
            if (index !== null && index !== undefined) {
                return groups[index]
            } else {
                return groups
            }
        } else {
            return []
        }
    }
    // 查询维度的列名
    window["finColumnByGroup"] = function (group) {
        var column = {}
        if (group.rows && group.rows.length > 0) {
            for (var i = 0; i < group.rows.length; i++) {
                column[group.rows[i].colName] = 0
            }
        }
        return column
    }
}())