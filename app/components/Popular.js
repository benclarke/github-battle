import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage ({ selectedLanguage, onSelect }) {

	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className='languages'>
			{languages.map( (lang) => {
				
				return (
					<li 
						style={lang === selectedLanguage ? {color: '#d0021b'} : null}
						key={lang} 
						onClick={() => onSelect(lang)}
					>
						{lang}
					</li>
				)
			})}
		</ul>

	)
}

function RepoGrid ({ repos }) {
	return (
		<ul className='popular-list'>
		{repos.map( ({name, stargazers_count, owner, html_url}, index) => {
			return (
			<li key={name} className='popular-item'>
				<div className='poplar-rank'>#{index +1}</div>
				<ul className='space-list-items'>
					<li>
						<img 
							className='avatar' 
							src={owner.avatar_url}
							alt={'Avatar for ' + owner.login}
						/>
					</li>
					<li><a href={html_url}>{name}</a></li>
					<li>@{owner.login}</li>
					<li>{stargazers_count} stars</li>
				</ul>
			</li>
			)
		})}

		</ul>

	)

}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	state = {
		selectedLanguage: 'All',
		repos: null,
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage = async (lang) => {
		this.setState( () => ({
				selectedLanguage: lang,
				repos: null
			}));

		const repos = await fetchPopularRepos(lang);
		this.setState( () => ({repos}));
	}

	render() {
		
		

		return (
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>	
				{ !this.state.repos ? <Loading text='Hold on' speed='50' /> : <RepoGrid repos={this.state.repos} /> }
				
			</div>
		)
	}


}

export default Popular;