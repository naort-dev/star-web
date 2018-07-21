import React from 'react'
import axios from 'axios'
import { LoginContainer, HeaderSection, FooterSection } from './styled'
import { fetch } from '../../services/fetch'
import Api from '../../lib/api';
import { Link, Redirect } from 'react-router-dom'
import MultiSelect from '../../components/MultiSelect'
import SelectTags from '../../components/SelectTag'
import Loader from '../../components/Loader'
import { Scrollbars } from 'react-custom-scrollbars';

export default class Starbio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: null,
            industry: [],
            featuredImage: null,
            firstImage: null,
            secondImage: null,
            multi: true,
            multiValue: [],
            featuredImageName: null,
            secondaryImageNames: [],
            avatarImageName: null,
            profession: [],
            searchTags: [],
            bio: "",
            bookingPrice: "",
            bookingLimit: "",
            errors: {
                bio: false,
                profession: false,
                searchTags: false,
                bookingPrice: false,
                bookingLimit: false,

            },
            saving: false
        }
    }

    componentDidMount() {
        const savedValues = JSON.parse(localStorage.getItem("bioDetails"))
        this.setState({ ...savedValues  })
        fetch('user/professions/').then(response => {
            let dropDownList = [];
            response.data.data.professions.map((profObj, profIndex) => {
                dropDownList.push({ value: profObj.id, label: profObj.title });
                profObj.child.map((childObj) => {
                    dropDownList.push({ value: childObj.id, label: childObj.title });
                });
            });
            return dropDownList;
        }
        )

            .then(industryItem => this.setState({ industry: industryItem }))

    }

    beforeUpload(file) {
        this.setState({ file: file })
    }

    onFileChange(type = "featuredImage") {
        const file = document.getElementById(type).files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            this.setState({ [type]: reader.result, [`${type}File`]: file })
        }.bind(this), false);
        if (file) {
            reader.readAsDataURL(file);
        } 
    }

    uploadImage(type) {
        return fetch(Api.getImageCredentials, {
            'headers': { 'Authorization': `token ${this.props.session.auth_token.authentication_token}` }
        })
            .then(response => {
                let filename = response.data.data.fields.key.split('/')
                filename = filename[2]
                const formData = new FormData()
                formData.append('success_action_status', response.data.data.fields.success_action_status);
                formData.append('signature', response.data.data.fields.signature)
                formData.append('x-amz-security-token', response.data.data.fields["x-amz-security-token"]);
                formData.append('acl', response.data.data.fields.acl);
                formData.append('Access-Control-Allow-Origin', response.data.data.fields["Access-Control-Allow-Origin"]);
                formData.append('policy', response.data.data.fields.policy);
                formData.append('key', response.data.data.fields.key);
                formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
                formData.append('file', this.state[`${type}File`]);
                if (type == "firstImage") {
                    const secondaryImageNames = [...this.state.secondaryImageNames]
                    secondaryImageNames[0] = filename
                    this.setState({ secondaryImageNames })
                }
                else if (type == "secondImage") {
                    const secondaryImageNames = [...this.state.secondaryImageNames]
                    secondaryImageNames[1] = filename
                    this.setState({ secondaryImageNames })
                }
                else {
                    this.setState({ [`${type}Name`]: filename })
                }
                return { formData, url: response.data.data.url }
            })
            .then(response => axios.post(response.url, response.formData))
    }


    onContinueClick() {
        if (this.validateIsEmpty()) {
            this.setState({ saving: true })
            const bioDetails = {
                profession: this.state.profession,
                searchTags: this.state.searchTags,
                bio: this.state.bio,
                bookingPrice: this.state.bookingPrice,
                bookingLimit: this.state.bookingLimit,
                charity: this.state.charity,
                featuredImage: this.state.featuredImage,
                firstImage: this.state.firstImage,
                secondImage: this.state.secondImage,
                avatar: this.state.avatar
            }
            localStorage.setItem("bioDetails", JSON.stringify(bioDetails));
            this.uploadImage("featuredImage")
                .then(() => this.uploadImage("firstImage"))
                .then(() => this.uploadImage("secondImage"))
                .then(() => this.uploadImage("avatarImage"))
                .then(() => {
                    fetch.post('https://app.staging.starsona.com/api/v1/user/profileimages/',
                        {
                            images: [...this.state.secondaryImageNames, this.state.featuredImageName, this.state.avatarImageName],
                            avatar_photo: this.state.avatarImageName,
                            featured_image: this.state.featuredImageName
                        }, {
                            "headers": {
                                'Authorization': `token ${this.props.session.auth_token.authentication_token}`
                            }
                        })
                    this.setState({ saving: false })
                })
                .then(() => this.props.history.push({
                    pathname: '/recordvideo', state: {
                        bioDetails: {
                            charity: this.state.charity,
                            weekly_limits: this.state.bookingLimit,
                            rate: this.state.bookingPrice,
                            profession: this.state.profession,
                            description: this.state.bio
                        },
                        images: {
                            featuredImage: this.state.featuredImage,
                            firstImage: this.state.firstImage,
                            secondImage: this.state.secondImage
                        }
                    }
                })

                )
        }

    }

    handleOnChange(value) {
        const { multi } = this.state;
        if (multi) {
            this.setState({ multiValue: value });
        } else {
            this.setState({ value });
        }
    }

    handleFieldChange(fieldType, fieldValue) {
        if (fieldType === 'profession') {
            const professionArray = fieldValue.split(',');
            if (professionArray.length <= 3) {
                this.setState({ profession: professionArray, errors: { ...this.state.errors, profession: false } });
            }
        } else if (fieldType === 'searchTags') {
            this.setState({ searchTags: fieldValue });
        } else {
            this.setState({ [`${fieldType}`]: fieldValue, errors: { ...this.state.errors, [`${fieldType}`]: false } });
        }
    }

    isNumberKey(event) {
        var charCode = event.keyCode;
        if (([46, 8, 9, 27, 13, 110].indexOf(charCode)) !== -1 ||
            // Allow: Ctrl/cmd+A
            (charCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
            (charCode === 67 && (event.ctrlKey === true || event.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
            (charCode === 88 && (event.ctrlKey === true || event.metaKey === true)) ||
            // Allow: home, end, left, right
            (charCode >= 35 && charCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((event.shiftKey || (charCode < 48 || charCode > 57)) && (charCode < 96 || charCode > 105)) {
            event.preventDefault();
        }
    }


    validateIsEmpty() {
        if (this.state.bio == null) {
            this.setState({ errors: { ...this.state.errors, bio: true } })
            return false
        }

        if (this.state.profession.length == 0) {
            this.setState({ errors: { ...this.state.errors, profession: true } })
            return false
        }

        if (this.state.bookingPrice == null) {
            this.setState({ errors: { ...this.state.errors, bookingPrice: true } })
            return false
        }

        if (this.state.bookingLimit == null) {
            this.setState({ errors: { ...this.state.errors, bookingLimit: true } })
            return false
        }

        return true


    }

    FullscreenUploader = () => {
        return (
            <LoginContainer.FullScreenUploadWrapper >
                <LoginContainer.FullScreenUploadButton onClick={() => { }}>
                    +
            </LoginContainer.FullScreenUploadButton>
                <LoginContainer.FullScreenUploadInput accept=".png, .jpeg, .jpg" id="featuredImage" onChange={() => this.onFileChange("featuredImage")} type="file" />
            </LoginContainer.FullScreenUploadWrapper>
        )


    }

    render() {
        if (!this.props.session.isLoggedIn) {
            return <Redirect to="/signuptype" />
        }
        return (

            <LoginContainer.wrapper>
                <LoginContainer>
                    {this.state.saving ?
                        <LoginContainer.loaderWrapper>
                            <Loader />
                        </LoginContainer.loaderWrapper>
                        : null}

                    <LoginContainer.LeftSection>
                        <HeaderSection>
                            <Link to="/">
                                <HeaderSection.LogoImage
                                    src="assets/images/logo_starsona_large.svg"
                                    alt=""
                                />
                            </Link>
                            <Link to="#">
                                <HeaderSection.RightDiv>I'M A STAR</HeaderSection.RightDiv>
                            </Link>
                        </HeaderSection>
                        <LoginContainer.Container>
                            <LoginContainer.Heading>Tell your fans about yourself</LoginContainer.Heading>
                            <LoginContainer.HeadingSubText>You can always update these later in your profile </LoginContainer.HeadingSubText>
                        </LoginContainer.Container>
                        <LoginContainer.Ask>
                            <LoginContainer.InputwrapperDiv>
                                <LoginContainer.InputWrapper>
                                    <LoginContainer.Label>Your bio</LoginContainer.Label>
                                    <LoginContainer.WrapsInput>

                                        <LoginContainer.InputArea placeholder="Have fun with it... no need to be serious" value={this.state.bio} onChange={event => { this.handleFieldChange('bio', event.target.value) }} />

                                        {this.state.errors.bio ? <LoginContainer.ErrorMsg>Please enter a valid event title</LoginContainer.ErrorMsg> : null}

                                    </LoginContainer.WrapsInput>
                                </LoginContainer.InputWrapper>
                            </LoginContainer.InputwrapperDiv>


                            <LoginContainer.InputWrapper>
                                <LoginContainer.Label>Your industry</LoginContainer.Label>
                                <LoginContainer.WrapsInput>


                                    <MultiSelect industry={this.state.industry} value={this.state.profession} profession={this.state.profession.join(',')} handleFieldChange={this.handleFieldChange.bind(this)} />
                                    {this.state.errors.profession ? <LoginContainer.ErrorMsg>Please choose your industry</LoginContainer.ErrorMsg> : null}
                                </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper>


                            <LoginContainer.InputWrapper>
                                <LoginContainer.Label>Search tags</LoginContainer.Label>
                                <LoginContainer.WrapsInput>

                                    <SelectTags searchTags={this.state.searchTags} value={this.state.searchTags} handleFieldChange={this.handleFieldChange.bind(this)} />

                                </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper>


                            <LoginContainer.InputWrapper>
                                <LoginContainer.Label>Your charity</LoginContainer.Label>
                                <LoginContainer.WrapsInput>

                                    <LoginContainer.Input  placeholder="optional" value={this.state.charity} onChange={event => { this.handleFieldChange('charity', event.target.value) }} />

                                </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper>


                            <LoginContainer.InputWrapper>
                                <LoginContainer.Label>Booking price minimum</LoginContainer.Label>
                                <LoginContainer.WrapsInput>

                                    <LoginContainer.Input type="tel" placeholder="$0" onKeyDown={(event) => { return this.isNumberKey(event) }}
                                        onChange={event => { this.handleFieldChange('bookingPrice', event.target.value) }}
                                        value={this.state.bookingPrice} />
                                    {this.state.errors.bookingPrice ? <LoginContainer.ErrorMsg>Please enter your booking price</LoginContainer.ErrorMsg> : null}
                                </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper>


                            <LoginContainer.InputWrapper>
                                <LoginContainer.Label>Booking limit</LoginContainer.Label>
                                <LoginContainer.WrapsInput>

                                    <LoginContainer.Input type="tel" placeholder="0" onKeyDown={(event) => { return this.isNumberKey(event) }}
                                        value={this.state.bookingLimit}
                                        onChange={event => { this.handleFieldChange('bookingLimit', event.target.value) }} />
                                    {this.state.errors.bookingLimit ? <LoginContainer.ErrorMsg>Please enter your booking limit</LoginContainer.ErrorMsg> : null}
                                </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper>

                        </LoginContainer.Ask>
                    </LoginContainer.LeftSection>
                    <LoginContainer.FooterLayout>
                        <FooterSection>
                            <FooterSection.LeftSection>
                            </FooterSection.LeftSection>
                            <FooterSection.RightSection>
                                {this.state.featuredImage != null && (
                                    this.state.firstImage != null && this.state.secondImage != null
                                ) ?
                                    <FooterSection.Button disabled={this.state.saving} onClick={() => { this.onContinueClick() }} >
                                        {this.state.saving ? "Saving..." : "Continue"} </FooterSection.Button>
                                    :
                                    <FooterSection.DisabledButton disabled={true} onClick={() => { this.onContinueClick() }}>Continue </FooterSection.DisabledButton>
                                }

                            </FooterSection.RightSection>
                        </FooterSection>
                    </LoginContainer.FooterLayout>



                    <LoginContainer.RightSection>
                        <LoginContainer.ImageWrapper>
                            <LoginContainer.FeaturedImage imageType="featured" image={this.state.featuredImage}>
                                {/* {this.state.featuredImage != null ?
                            <img src={this.state.featuredImage}/>
                            : */}
                                <LoginContainer.ImageInner>
                                    {this.state.featuredImage != null ?

                                        this.FullscreenUploader() :
                                        <React.Fragment>
                                            <LoginContainer.UploadWrapper >
                                                <LoginContainer.UploadButton onClick={() => { }}>
                                                    +
                        </LoginContainer.UploadButton>
                                                <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="featuredImage" onChange={() => this.onFileChange("featuredImage")} type="file" />
                                            </LoginContainer.UploadWrapper>
                                            <LoginContainer.FeaturedText> Featured Banner </LoginContainer.FeaturedText>
                                            <LoginContainer.CaptionText> At least 800x376 or larger   </LoginContainer.CaptionText>
                                        </React.Fragment>
                                    }
                                </LoginContainer.ImageInner>
                            </LoginContainer.FeaturedImage>
                            <LoginContainer.FirstImage imageType="firstimage" image={this.state.firstImage}>
                                <LoginContainer.ImageInner>
                                    {this.state.firstImage != null ?

                                        this.FullscreenUploader() :
                                        <React.Fragment>
                                            <LoginContainer.UploadWrapper>
                                                <LoginContainer.UploadButton onClick={() => { }}>
                                                    +
                                </LoginContainer.UploadButton>
                                                <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="firstImage" onChange={() => this.onFileChange("firstImage")} type="file" />

                                            </LoginContainer.UploadWrapper>
                                            <LoginContainer.FeaturedText> Secondary Image </LoginContainer.FeaturedText>
                                            <LoginContainer.CaptionText>At least 400x400 </LoginContainer.CaptionText>
                                        </React.Fragment>
                                    }
                                </LoginContainer.ImageInner>

                            </LoginContainer.FirstImage>
                            <LoginContainer.SecondImage imageType="secondImage" image={this.state.secondImage}>
                                <LoginContainer.ImageInner>
                                    {this.state.secondImage != null ?

                                        this.FullscreenUploader() :
                                        <React.Fragment>
                                            <LoginContainer.UploadWrapper>
                                                <LoginContainer.UploadButton onClick={() => { }}>
                                                    +
                                </LoginContainer.UploadButton>
                                                <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="secondImage" onChange={() => this.onFileChange("secondImage")} type="file" />
                                            </LoginContainer.UploadWrapper>
                                            <LoginContainer.FeaturedText>Secondary Image </LoginContainer.FeaturedText>
                                            <LoginContainer.CaptionText>At least 400x400  </LoginContainer.CaptionText>
                                        </React.Fragment>
                                    }
                                </LoginContainer.ImageInner>

                            </LoginContainer.SecondImage>

                            <LoginContainer.Avatar style={{ backgroundColor: "grey" }} imageType="avatar" image={this.state.avatar}>
                                <LoginContainer.UploadWrapper>
                                    <LoginContainer.UploadButton style={{ visibility: "hidden" }} onClick={() => { }}>
                                        +
                                </LoginContainer.UploadButton>
                                    <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="avatar" onChange={() => this.onFileChange("avatar")} type="file" />
                                </LoginContainer.UploadWrapper>
                            </LoginContainer.Avatar>

                        </LoginContainer.ImageWrapper>
                    </LoginContainer.RightSection>
                </LoginContainer>
            </LoginContainer.wrapper>
        )
    }
}
