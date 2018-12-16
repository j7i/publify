import { FirebaseCollection, firestore } from '@config'
import { Button, Card, CardActionArea, CardActions, CardContent, Chip, FormControlLabel, Switch, Typography } from '@material-ui/core'
import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertCardElementProps, IAdvertCardElementState } from './types'

export class AdvertCardElement extends PureComponent<IAdvertCardElementProps, IAdvertCardElementState> {
  public state: IAdvertCardElementState = {
    published: this.props.advert.published
  }

  public render(): JSX.Element {
    const { advert, withActions } = this.props
    return (
      <Card className={styles.card}>
        <Link as={`/detail/${advert.id}`} href={`/detail?id=${advert.id}`}>
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
                {advert.type}
              </Typography>
              <Typography component="p">{advert.description}</Typography>
              <div className={styles.categories}>
                {advert.categories.map((categorie: string, index: number) => (
                  <Chip className={styles.chip} key={index} label={categorie} variant="outlined" color="primary" />
                ))}
              </div>
            </CardContent>
          </CardActionArea>
        </Link>
        {withActions && (
          <CardActions>
            <Button size="small" color="primary">
              <Link as={`/adverts/edit/${advert.id}`} href={`/edit?id=${advert.id}`}>
                <span className={styles.preventMaterialAddingClassnameToNextLinkError}>Edit</span>
              </Link>
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

    const { id } = this.props.advert
    const { published } = this.state

    firestore
      .collection(FirebaseCollection.ADVERTS)
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
