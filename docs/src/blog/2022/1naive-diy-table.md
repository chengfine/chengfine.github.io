# naiveui 表格数据，编辑表格功能，下拉框

---

1.不换行，超出部分隐藏且以省略号形式出现

```javascript
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```

2.

```javascript
<n-data-table
  :row-props="rowProps"
  :columns="DataOnePackageColumnsRef"
  :data="DataOnePackageTableData"
  :row-key="(rows) => rows.nodeId"
  :checked-row-keys="checkedFilesKey"
  :row-class-name="rowClassName"
  ref="oneDataPackageTabl"
  :loading="oneDataPackageTablLoading"
  :remote="true"
  max-height="320px"
  :on-update:checked-row-keys="handleCheckFilesKeys"
/>
```

DataOnePackageColumnsRef 中使用 rander 函数

```javascript
{
    title: '标签',
    key: 'nodeLabel',
    width: '200px',

    // ellipsis: {
    //   tooltip: true,
    // },
    render(row) {
      const { nodeType, nodeLabel, labelEdit } = row;
      return h(
        'div',
        {
          className: 'w-full h-full',
          style: { 'min-height': '34px' },
        },
        [
          h(
            'h1',
            {
              className: labelEdit ? 'block flex' : 'hidden',
              style: {
                cursor: 'pointer',
                height: '100%',
                width: '100%',
                'min-height': '34px',
                'align-items': 'center',
              },
              onClick: sendTablenodeLabelClick.bind(null, row),
            },
            nodeLabel
          ),
          h('div', { className: labelEdit ? 'hidden' : 'flex ' }, [
            h(
              NSelect,
              {
                value: nodeLabel ? nodeLabel.split(',') : null,
                multiple: true,
                clearable: true,
                options: labelInfoOptions.value,
                'on-update:value': labelSelectUpdate.bind(null, row),
              },
              { default: () => nodeLabel }
            ),
            h(
              'span',
              {
                className: 'cursor-pointer flex items-center',
              },
              [
                h(
                  NIcon,
                  {
                    size: 20,
                    style: { margin: '0 10px 0 5px' },
                    onClick: labelCheckIconClick.bind(null, row),
                  },
                  {
                    default: () => {
                      return h(CheckOutlined);
                    },
                  }
                ),
                h(
                  NIcon,
                  {
                    size: 20,
                    onClick: labelCloseIconClick.bind(null, row),
                  },
                  {
                    default: () => {
                      return h(CloseOutlined);
                    },
                  }
                ),
              ]
            ),
          ]),
        ]
      );
    },
  },
```
