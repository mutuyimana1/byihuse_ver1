import UserPanel from 'Container/UserPanel';

const Byiza = () => import('Views/byiza');
const Rental = () => import('Views/rental');
const Drycleaning = () => import('Views/drycleaning');
const Search = () => import('Views/search');
const HomeV1 = () => import('Views/HomeV1');
const services = () => import('Views/services.vue');
// const Accessory = () => import('Views/Accesory');
const ProductCategoies = () => import('Views/productcategories');
const ProductDepartments = () => import('Views/productDepartment');
const Product = () => import('Views/Product');
const Payment = () => import('Views/Payment/Payment');
const Cart = () => import('Views/Cart');
// const Checkout = () => import('Views/Checkout');
const FinalReceipt = () => import('Views/FinalReceipt');
const ProductDetail = () => import('Views/ProductDetail');
const AboutUs = () => import('Views/AboutUs');
const TermCondiition = () => import('Views/TermsAndCondition');
const Faq = () => import('Views/Faq');
const Account = () => import('Views/UserAccount/Account.vue');
const OrderHistory = () => import('Views/UserAccount/OrderHistory.vue');
const Profile = () => import('Views/UserAccount/Profile.vue');
const Address = () => import('Views/UserAccount/Address.vue');
const Cards = () => import ('Views/UserAccount/Cards.vue');
const EditProfile = () => import ('Views/UserAccount/EditProfile.vue');
const editEmail = () => import ('Views/UserAccount/editEmail.vue');
const editNames = () => import ('Views/UserAccount/editNames.vue');
const editPassword = () => import ('Views/UserAccount/editPassword.vue');
// const EditProfileInfo = () => import ('Views/UserAccount/EditProfileInfo.vue');
const BlogDetail = () => import('Views/Blogs/BlogDetails');
const ContactUs = () => import('Views/Contact');
const PrivacyPolicy = () => import('Views/PrivacyPolicy');
const Register = () => import('Views/Sessions/Register');
const ForgotPassword = () => import('Views/Sessions/ForgotPassword');
const ThankYou = () => import('Views/Sessions/ThankYou');
const SignIn = () => import('Views/Sessions/SignIn');


export default {
	path: '/',
	component: UserPanel,
	redirect:'en/home',
	children:[
		{ 
			path: 'home',
			component: HomeV1 ,
			meta: {
				header: 1
			 }
		},
		{			
			path: 'rental',
			component: Rental,
			name: 'Rental'
		},
		{			
			path: 'byiza',
			component: Byiza,
			name: 'Byiza'
		},
		{			
			path: 'byoroshye',
			component: Drycleaning,
			name: 'Drycleaning'
		},
		{			
			path: 'search/:keyword',
			component: Search,
			name: 'Search'
		},
		{			
			path: 'services',
			component: services,
			name: 'services'
		},
		{			
			path: 'products/:title',
			component: ProductDepartments,
			name: 'Products'
		},
		{			
			path: 'products/:department/:category',
			component: ProductCategoies,
			name: 'Products'
		},
		{			
			path: 'products',
			component: Product,
			name: 'all Products'
		},
		{ 
			path: 'checkout/payment',
			component: Payment 
		},
		{ 
			path: 'cart',
			component: Cart,
		},
		// { 
		// 	path: '/checkout',
		// 	component: Checkout  
		// },
		{ 
			path: 'products/:title/:category/:id',
			component: ProductDetail, 
			name:'productDetail'
		},
		{ 
			path: 'checkout/final-receipt',  
			component: FinalReceipt, 
			name:'FinalReceipt'
		},
		{ 
			path: 'about',  
			component: AboutUs, 
			name:'about'
		},
		{ 
			path: 'term-condition',  
			component: TermCondiition, 
			name:'term-condition'
		},
		{ 
			path: 'faq',  
			component: Faq, 
			name:'Faq'
		},
		{ 
			path: '/',  
			component: Account, 
			name:'Account',
			children: [
            {
					path: 'account/order-history',name:'OrderHistory',component: OrderHistory,
				},
				{
					path: 'account/profile',name:'Profile',component: Profile,
				},
				{
					path: 'account/address',name:'Address',component: Address,
				},
				{
					path: 'account/cards',name:'Cards',component: Cards,
				},
				{
					path: 'account/profile/edit',name:'EditProfile',component: EditProfile
				},
				// {
				// 	path: '/account/profile/edit',name:'EditAddress',component: EditAddress
				// },
				{
					path: 'account/profile-edit/name',
					name:'editNames',
					component: editNames,
				},
				{
					path: 'account/profile-edit/email',
					name:'editEmail',
					component: editEmail,
				},
				{
					path: 'account/profile-edit/password',
					name:'editPassword',
					component: editPassword,
				},
				// {
				// 	path: '/account/profile/edit',name:'EditProfileInfo',component: EditProfileInfo,
				// },
        ]
		},
		{ 
			path: '/blog-detail/:id',  
			component: BlogDetail, 
			name:'BlogDetail;'
		},
		{ 
			path: 'contact',  
			component: ContactUs, 
			name:'ContactUs'
		},

		{ 
			path: '/privacy-policy',  
			component: PrivacyPolicy, 
			name:'PrivacyPolicy'
		},
		{ 
			path: 'session/signup',  
			component: Register, 
			name:'Register'
		},
		{ 
			path: '/session/forgot-password',  
			component: ForgotPassword, 
			name:'ForgotPassword'
		},
		{ 
			path: 'session/thank-you',  
			component: ThankYou, 
			name:'ThankYou'
		},
		{ 
			path: 'session/signin',  
			component: SignIn, 
			name:'SignIn'
		}
	]
}