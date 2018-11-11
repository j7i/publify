import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertCardElementProps, IAdvertCardElementState } from './types'

export default class AdvertCardElement extends PureComponent<IAdvertCardElementProps, IAdvertCardElementState> {
  public state: IAdvertCardElementState = {
    published: this.props.demand.published
  }

  public render(): JSX.Element {
    const { demand, withActions } = this.props
    return (
      <Card className={styles.card}>
        <CardActionArea>
          {/* <CardMedia
            component="img"
            alt="Alternative"
            className={styles.media}
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          /> */}
          <CardMedia component="img" height="140" className={styles.media} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {demand.type}
            </Typography>
            <Typography component="p">{demand.description}</Typography>
            <div className={styles.categories}>
              {demand.categories.map((categorie: string, index: number) => (
                <Chip className={styles.chip} key={index} label={categorie} variant="outlined" color="primary" />
              ))}
            </div>
          </CardContent>
        </CardActionArea>
        {withActions && (
          <CardActions>
            <Button size="small" color="primary">
              Edit
            </Button>
            <div className={styles.grow} />
            <FormControlLabel
              control={<Switch checked={this.state.published} onChange={this.handleChange} value="checkedB" color="primary" />}
              label="Published"
              labelPlacement="start"
            />
          </CardActions>
        )}
      </Card>
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ published: event.target.checked })
  }
}
