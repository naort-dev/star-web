import React from 'react'
import axios from 'axios'
import { LoginContainer, HeaderSection, FooterSection } from './styled'
import { Scrollbars } from 'react-custom-scrollbars';
import { fetch } from '../../services/fetch'
import Api from '../../lib/api';
import { Link } from 'react-router-dom'
import MultiSelect from '../../components/MultiSelect'
import SelectTags from '../../components/SelectTag'
import Select from 'react-select'


// function beforeUpload(file) {
//   const isJPG = file.type === 'image/jpeg';
//   if (!isJPG) {
//     message.error('You can only upload JPG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJPG && isLt2M;
// }

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
            // image: [],
            multiValue: [],
            value: undefined,
            featuredImageName: null,
            secondaryImageNames: [],
            avatarImageName: null
            
        }
    }

    componentDidMount() {
        let industry = this.state.industry
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
        var file = document.getElementById(type).files[0];
        if (file.size < 2 * 1024 * 1024) {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                this.setState({ [type]: reader.result, [`${type}File`]: file })
            }.bind(this), false);

            if (file) {
                reader.readAsDataURL(file);
            }

        }

        else {
            alert("file size is large")
        }
    }

    handleSelectChange(value) {
        if (value.split(',').length <= 3) {
            this.setState({ value });
        }
    }



    uploadImage(type) {
        return fetch(Api.getImageCredentials, {
            'headers': { 'Authorization': `token ${this.props.session.auth_token.authentication_token}` }
        })
            .then(response => {
                let images = this.state.secondaryImageNames
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
                if (type == "secondaryImage") {
                    this.setState({ [`${type}Names`]: [...images, filename] })
                }

                else {
                    this.setState({ [`${type}Name`]: filename })
                }
                return { formData, url: response.data.data.url }
            })
            .then(response => axios.post(response.url, response.formData))
    }


    onContinueClick() {
        // this.props.fetchImageDetails({
        //     images: [...this.state.image, this.state.featured],
        //     avatar_photo: this.state.image[0],
        //     featured_image: this.state.featured
        // }, `token ${this.props.session.auth_token.authentication_token}`)

        // fetch(Api.getImageCredentials, {
        //     'headers': { 'Authorization': `token ${this.props.session.auth_token.authentication_token}` }
        // }).then(response => console.log("response is", response))

        // this.props.history.push('/recordvideo')

        this.uploadImage("featuredImage")
        .then(() => this.uploadImage("secondaryImage"))
        
    }

    handleOnChange(value) {
        const { multi } = this.state;
        if (multi) {
            this.setState({ multiValue: value });
        } else {
            this.setState({ value });
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

    render() {
        console.log("aaaaaaaaaaaa", this.state)


        return (

            <LoginContainer.wrapper>
                <LoginContainer>
                    <LoginContainer.LeftSection>
                        <HeaderSection>
                            <Link to="/">
                                <HeaderSection.LogoImage
                                    src="assets/images/logo_starsona_large.svg"
                                    alt=""
                                />
                            </Link>
                            <Link to="/login">
                                <HeaderSection.RightDiv>I'M A STAR</HeaderSection.RightDiv>
                            </Link>
                        </HeaderSection>
                        <LoginContainer.Container>
                            <LoginContainer.Heading>Tell your fans about yourself</LoginContainer.Heading>
                            <LoginContainer.HeadingSubText>You can always update these later in your profile </LoginContainer.HeadingSubText>
                        </LoginContainer.Container>
                        <LoginContainer.InputContainer>
                            <LoginContainer.InputContainerWrapper>
                                <LoginContainer.InputWrapper>
                                    <LoginContainer.LabelContainer>
                                        <label> Your bio </label>
                                    </LoginContainer.LabelContainer>
                                    <LoginContainer.RightContainer>
                                        <LoginContainer.TextArea placeholder="no need to be serious... have fun with it" />
                                    </LoginContainer.RightContainer>

                                </LoginContainer.InputWrapper>

                                <LoginContainer.InputWrapper>
                                    <LoginContainer.LabelContainer>
                                        <label> Your industry </label>
                                    </LoginContainer.LabelContainer>
                                    <LoginContainer.RightContainer>
                                        <MultiSelect industry={this.state.industry} />
                                    </LoginContainer.RightContainer>
                                </LoginContainer.InputWrapper>

                                <LoginContainer.InputWrapper>
                                    <LoginContainer.LabelContainer>
                                        <label> Search tags </label>
                                    </LoginContainer.LabelContainer>
                                    <LoginContainer.RightContainer>
                                        <SelectTags />
                                    </LoginContainer.RightContainer>
                                </LoginContainer.InputWrapper>


                                <LoginContainer.InputWrapper>
                                    <LoginContainer.LabelContainer>
                                        <label> Your charity </label>
                                    </LoginContainer.LabelContainer>
                                    <LoginContainer.RightContainer>
                                        <LoginContainer.Input placeholder="optional" />
                                    </LoginContainer.RightContainer>
                                </LoginContainer.InputWrapper>

                                <LoginContainer.InputWrapper>
                                    <LoginContainer.LabelContainer>
                                        <label> Booking price minimum </label>
                                    </LoginContainer.LabelContainer>
                                    <LoginContainer.RightContainer>
                                        <LoginContainer.Input placeholder="$0" onKeyDown={(event) => { return this.isNumberKey(event) }} />
                                    </LoginContainer.RightContainer>
                                </LoginContainer.InputWrapper>

                                <LoginContainer.InputWrapper>
                                    <LoginContainer.LabelContainer>
                                        <label> Booking limit  </label>
                                    </LoginContainer.LabelContainer>
                                    <LoginContainer.RightContainer>
                                        <LoginContainer.Input placeholder="0" onKeyDown={(event) => { return this.isNumberKey(event) }} />
                                    </LoginContainer.RightContainer>
                                </LoginContainer.InputWrapper>
                            </LoginContainer.InputContainerWrapper>
                        </LoginContainer.InputContainer>
                    </LoginContainer.LeftSection>
                    <LoginContainer.FooterLayout>
                        <FooterSection>
                            <FooterSection.LeftSection>
                            </FooterSection.LeftSection>
                            <FooterSection.RightSection>
                                <FooterSection.Button onClick={() => { this.onContinueClick() }}>Continue</FooterSection.Button>
                            </FooterSection.RightSection>
                        </FooterSection>
                    </LoginContainer.FooterLayout>

                    <LoginContainer.RightSection>
                        <LoginContainer.FeaturedImage imageType="featured" image={this.state.featuredImage}>
                            {/* {this.state.featuredImage != null ?
                            <img src={this.state.featuredImage}/>
                            : */}
                            <LoginContainer.UploadWrapper >
                                <LoginContainer.UploadButton onClick={() => { }}>
                                    +
                                </LoginContainer.UploadButton>
                                <LoginContainer.UploadInput accept=".png, .jpeg" id="featuredImage" onChange={() => this.onFileChange("featuredImage")} type="file" />
                            </LoginContainer.UploadWrapper>

                        </LoginContainer.FeaturedImage>
                        <LoginContainer.FirstImage imageType="firstimage" image={this.state.firstImage}>
                            <LoginContainer.UploadWrapper>
                                <LoginContainer.UploadButton onClick={() => { }}>
                                    +
                                </LoginContainer.UploadButton>
                                <LoginContainer.UploadInput accept=".png, .jpeg" id="firstImage" onChange={() => this.onFileChange("firstImage")} type="file" />

                            </LoginContainer.UploadWrapper>
                        </LoginContainer.FirstImage>
                        <LoginContainer.SecondImage imageTType="secondImage" image={this.state.secondImage}>
                            <LoginContainer.UploadWrapper>
                                <LoginContainer.UploadButton onClick={() => { }}>
                                    +
                                </LoginContainer.UploadButton>
                                <LoginContainer.UploadInput accept=".png, .jpeg" id="secondImage" onChange={() => this.onFileChange("secondImage")} type="file" />
                            </LoginContainer.UploadWrapper>
                        </LoginContainer.SecondImage>

                        <LoginContainer.Avatar imageType="avatar" image={this.state.avatar}>
                            <LoginContainer.UploadWrapper>
                                <LoginContainer.UploadButton onClick={() => { }}>
                                    +
                                </LoginContainer.UploadButton>
                                <LoginContainer.UploadInput accept=".png, .jpeg" id="avatar" onChange={() => this.onFileChange("avatar")} type="file" />
                            </LoginContainer.UploadWrapper>
                        </LoginContainer.Avatar>
                    </LoginContainer.RightSection>
                </LoginContainer>
            </LoginContainer.wrapper>
        )
    }
}
