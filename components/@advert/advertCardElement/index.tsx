import { firestore } from '@config/firebase'
import { FirebaseCollection } from '@config/firebase/types.d'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertCardElementProps, IAdvertCardElementState } from './types'

export default class AdvertCardElement extends PureComponent<IAdvertCardElementProps, IAdvertCardElementState> {
  public state: IAdvertCardElementState = {
    published: this.props.seeking.published
  }

  public render(): JSX.Element {
    const { seeking, withActions } = this.props
    return (
      <Card className={styles.card}>
        <Link as={`/detail/${seeking.id}`} href={`/detail?id=${seeking.id}`}>
          <CardActionArea>
            {/* <CardMedia
            component="img"
            alt="Alternative"
            className={styles.media}
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          /> */}
            {/* <CardMedia component="img" height="140" className={styles.media} /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {seeking.type}
              </Typography>
              <Typography component="p">{seeking.description}</Typography>
              <div className={styles.categories}>
                {seeking.categories.map((categorie: string, index: number) => (
                  <Chip className={styles.chip} key={index} label={categorie} variant="outlined" color="primary" />
                ))}
              </div>
            </CardContent>
          </CardActionArea>
        </Link>
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
    event.preventDefault()

    const { id } = this.props.seeking
    const { published } = this.state

    firestore
      .collection(FirebaseCollection.SEEKINGS)
      .doc(id)
      .update({
        published: !published
      })
      .then(() => {
        this.setState({ published: !published })
      })
      // tslint:disable-next-line:no-any
      .catch((error: any) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
