import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent'
import Header from '../HeaderComponent';
import Footer from '../FooterComponent';
import Home from '../HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponents';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; // set up router so users can be sent to the correct location
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionsCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//get state from redux
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    // for this arrow function why are () used instead of brackets? since only postComment function call is being retuned?
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: (actions.reset('feedbackForm')), 
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions())
}

class Main extends Component {

    //called as soon as component is mounted onto the dom. before render?
    componentDidMount(){
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
    }

    render() {
        const HomePage = () => {
            return(
                <Home 
                    campsite={this.props.campsites.campsites.filter(campsite =>{ return campsite.featured===true})[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    partner={this.props.partners.filter(partner =>{ return partner.featured===true})[0]}
                    promotion={this.props.promotions.promotions.filter(promotion =>{ return promotion.featured===true})[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                />
            )
        }
        const CampsiteWithId = ({match})=>{
            return(
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite =>{ return campsite.id === +match.params.campsiteId })[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comments =>{ return comments.campsiteId === +match.params.campsiteId })}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                /> 
            )
        }
{/* Any routing request will got through the swtich component until it finds a matching path(route). Route acts like a case */}
        return (
            <div>
                <Header/>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path='/home' component={HomePage}/>
                                <Route path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                                <Route path='/directory/:campsiteId' component={CampsiteWithId}/>
                                <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites}/>}/>
                                <Route path='/aboutus' render={()=> <About partners={this.props.partners}/>}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//connect: allows main component to get state from redux store
// having mapDispatchToProps allows the actions to be avlible in the mainComponent(in this case) as a prop
//withRouter allows router to still work after changes to export