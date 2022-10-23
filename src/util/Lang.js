import Storage from 'util/Storage.js';

/* Translation files */
// English
import common_EN_en from 'lang/EN_en/common.json';
import dashboard_EN_en from 'lang/EN_en/dashboard.json';
import help_EN_en from 'lang/EN_en/help.json';
import home_EN_en from 'lang/EN_en/home.json';
import settings_EN_en from 'lang/EN_en/settings.json';

// Deutsch
import common_DE_de from 'lang/DE_de/common.json';
import dashboard_DE_de from 'lang/DE_de/dashboard.json';
import help_DE_de from 'lang/DE_de/help.json';
import home_DE_de from 'lang/DE_de/home.json';
import settings_DE_de from 'lang/DE_de/settings.json';

class Lang {
	static init = () => {
		const storedLanguage = Storage.get('language');
		if (storedLanguage) {
			Lang.current = storedLanguage;
		} else {
			Lang.current = 'DE_de';
		}

		Lang.resources = {
			EN_en: {
				common: common_EN_en,
				dashboard: dashboard_EN_en,
				help: help_EN_en,
				home: home_EN_en,
				settings: settings_EN_en,
			},
			DE_de: {
				common: common_DE_de,
				dashboard: dashboard_DE_de,
				help: help_DE_de,
				home: home_DE_de,
				settings: settings_DE_de,
			},
		};
	};

	/**
	 *
	 * @param {*} namespace
	 * @param {*} key
	 * @param {*} replacements
	 * @returns
	 */
	static translate = (namespace, key, replacements = null) => {
		const keys = key.split('.');
		let resource = Lang.resources[Lang.current][namespace];
		for (const key of keys) {
			resource = resource[key];
		}
		if (replacements === null) {
			return resource;
		}
		for (const replacement in replacements) {
			resource = resource.replace(`{{${replacement}}}`, replacements[replacement]);
		}
		return resource;
	};
}

export default Lang;
