module.exports = function (plop) {
  plop.setGenerator('midway-crud', {
    description: '生成MidwayJS CRUD模块',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: '请输入模块名称(英文名称,如 product-info ):',
        filter: input => input.trim(),
        validate: (input) => {
          if (input && !/^[\w-]+$/.test(input)) {
            return '名称仅支持字母、数字和下划线！';
          }
          return true;
        },
      },
    ],
    actions: (answers) => {
      // 自动生成 className（强制 PascalCase）
      const className = answers.moduleName
        .split(/[-_]/)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join('');

      // 自动生成默认 tableName 逻辑
      const tableName = answers.moduleName
        .replace(/([a-z])([A-Z])/g, '$1_$2') // 驼峰转下划线
        .replace(/-/g, '_') // 连字符转下划线
        .toLowerCase();

      console.warn(
        '\x1B[36m%s\x1B[0m',
        `请注意默认生成的实体类，默认字段有id、created_at、updated_at、deleted_at，请确认 ${tableName} 表是否包含这些字段，否则请手动修改实体类！`,
      );

      return [
        {
          type: 'add',
          path: `src/modules/{{moduleName}}/{{moduleName}}.controller.ts`,
          templateFile: 'plop-templates/controller.hbs',
          data: { className, tableName },
        },
        {
          type: 'add',
          path: `src/modules/{{moduleName}}/{{moduleName}}.entity.ts`,
          templateFile: 'plop-templates/entity.hbs',
          data: { className, tableName },
        },
        {
          type: 'add',
          path: `src/modules/{{moduleName}}/{{moduleName}}.service.ts`,
          templateFile: 'plop-templates/service.hbs',
          data: { className, tableName },
        },
      ];
    },
  });
};
