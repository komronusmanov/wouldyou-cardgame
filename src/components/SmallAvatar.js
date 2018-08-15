import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}

function SmallAvatar ({ classes, image, name }) {
  return (
    <div className={classes.row}>
      <Avatar
        alt={name}
        src={image}
        className='avatar'
        />
    </div>
  )
}

export default withStyles(styles)(SmallAvatar)
