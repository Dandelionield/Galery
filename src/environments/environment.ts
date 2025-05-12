export const environment = {

	production: false,
	firebase: {

		credentials: {

			apiKey: "AIzaSyB3z8H_ONA2a5TDQzXlRd3e44Bdy17OVds",
			authDomain: "multimedia-galery.firebaseapp.com",
			projectId: "multimedia-galery",
			storageBucket: "multimedia-galery.firebasestorage.app",
			messagingSenderId: "991199372171",
			appId: "1:991199372171:web:2c09e1f789ca7b671cc58e"

		}, collections: {

			picture: {

				name: 'picture',
				idField: 'id'

			}

		}

	}, supabase: {

		credentials: {

			url: 'https://dghhvdgxmqmhodneorow.supabase.co',
			key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnaGh2ZGd4bXFtaG9kbmVvcm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODcxMjUsImV4cCI6MjA2MjU2MzEyNX0.5Gn3gFB6b9bnMgJykJo8VaXOEcLvUwUn-wXjA-cAMVQ'

		}, buckets: {

			galery: {

				name: 'galery'

			}

		}

	}

};