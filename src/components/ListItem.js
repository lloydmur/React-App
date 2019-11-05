import React from 'react'
import { Table, Checkbox, Button } from 'semantic-ui-react'

export const ListItem = (props) => {
  const {item, handleToggle, handleDelete} =  props
  return (
    <Table.Row
      positive={item.completed}
    >
      <Table.Cell>
        <Checkbox
          checked= {item.completed}
          onChange = {handleToggle}
        />
      </Table.Cell>
      <Table.Cell>
        {item.title}
        <Button
          color="red"
          icon="trash"
          floated="right"
          compact
          size="small"
          onClick={handleDelete}
        />
      </Table.Cell>
    </Table.Row>
  )
}
