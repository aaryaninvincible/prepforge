# Admin Provisioning Guide

Admin privileges can only be granted via Firebase Admin SDK Custom Claims (`admin: true`) or direct Firestore Console modification of `/users/{uid}.role` to `'admin'`. Client-side escalation is blocked by `firestore.rules`.
