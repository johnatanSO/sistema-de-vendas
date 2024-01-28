import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  Skeleton,
} from '@mui/material'
import style from './ListMobile.module.scss'
import { useState } from 'react'
import { EmptyItems } from '../EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { CollapseItem } from './interfaces/CollapseItem'
import { Field } from './interfaces/Field'

interface ItemStatus {
  [itemId: string]: boolean
}

type Props = {
  items: any[]
  itemFields: Field[]
  collapseItems: CollapseItem[]
  emptyText?: string
  loading?: boolean
}

export function ListMobile({
  items,
  itemFields,
  collapseItems,
  emptyText,
  loading,
}: Props) {
  const [itemOpened, setItemOpened] = useState<ItemStatus>({})

  function handleOpenItem(itemId: string) {
    setItemOpened({
      [itemId]: !itemOpened[itemId],
    })
  }

  return (
    <List className={style.list}>
      {!loading &&
        items?.length > 0 &&
        items?.map((item: any) => {
          const collapseOpened = itemOpened[item._id] || false

          return (
            <div
              style={{
                opacity: loading ? 0.5 : 1,
              }}
              key={item._id}
              className={style.groupItem}
            >
              <ListItem
                onClick={() => {
                  handleOpenItem(item._id)
                }}
                className={style.listItem}
              >
                {itemFields?.map((field, index) => {
                  return (
                    <span
                      className={field?.cellClass?.({
                        value: item[field.field],
                        data: item,
                      })}
                      key={field.field}
                      style={{
                        marginRight: index === 0 ? 'auto' : 0,
                      }}
                    >
                      {field?.valueFormatter?.({
                        value: item[field.field],
                        data: item,
                      })}

                      {field?.cellRenderer?.({
                        value: item[field.field],
                        data: item,
                      })}
                    </span>
                  )
                })}
                {collapseItems?.length > 0 && (
                  <FontAwesomeIcon
                    className={style.angleIcon}
                    icon={collapseOpened ? faAngleUp : faAngleDown}
                  />
                )}
              </ListItem>

              {collapseItems?.length > 0 && (
                <Collapse in={collapseOpened} className={style.collapse}>
                  <List className={style.collapseList}>
                    {collapseItems.map((collapseItem) => {
                      return (
                        <ListItemButton
                          key={collapseItem.field}
                          className={style.collapseListItem}
                          disableRipple
                        >
                          {collapseItem.type === 'actions' ? (
                            <>
                              {collapseItem?.cellRenderer?.({
                                value: item[collapseItem.field],
                                data: item,
                              })}
                            </>
                          ) : (
                            <>
                              <span style={{ fontWeight: '600' }}>
                                {collapseItem.headerName}
                              </span>
                              <span
                                className={collapseItem?.cellClass?.({
                                  value: item[collapseItem.field],
                                  data: item,
                                })}
                              >
                                {collapseItem?.valueFormatter?.({
                                  value: item[collapseItem.field],
                                  data: item,
                                })}

                                {collapseItem?.cellRenderer?.({
                                  value: item[collapseItem.field],
                                  data: item,
                                })}
                              </span>
                            </>
                          )}
                        </ListItemButton>
                      )
                    })}
                  </List>
                </Collapse>
              )}
            </div>
          )
        })}

      {(items.length === 0 || !items) && !loading && (
        <EmptyItems text={emptyText || 'Nenhum item encontrado'} />
      )}

      {(!items || items.length === 0) &&
        loading &&
        [1, 2, 3, 4, 5].map((item) => {
          return (
            <div key={item} className={style.groupItem}>
              <ListItemButton className={style.listItem}>
                <Skeleton
                  variant="text"
                  height={18}
                  width={50}
                  sx={{ fontSize: '1rem', marginRight: 'auto' }}
                />
                <Skeleton
                  variant="text"
                  height={18}
                  width={150}
                  sx={{ fontSize: '1rem' }}
                />
              </ListItemButton>
            </div>
          )
        })}
    </List>
  )
}
