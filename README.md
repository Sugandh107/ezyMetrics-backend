EzyMetrics Backend
This is the backend for EzyMetrics, a data integration and reporting system that connects with CRM and Marketing platforms to fetch lead and campaign data, stores it in MongoDB, and generates reports in PDF/CSV formats. The backend also includes an alert system to notify about low conversion rates in campaigns.

API Endpoints
1. Get All Leads
Retrieves all leads from the database.

Endpoint:
GET /api/crm/leads

Response:
Returns a JSON array of leads.

2. Get All Campaigns
Retrieves all marketing campaigns from the database.

Endpoint:
GET /api/marketing/campaigns

Response:
Returns a JSON array of campaigns.

3. Generate PDF Report for Leads
Generates a PDF report of all leads.

Endpoint:
GET /api/report/pdf

Response:
A downloadable PDF file with the leads report.

4. Generate CSV Report for Leads
Generates a CSV report of all leads.

Endpoint:
GET /api/report/csv

Response:
A downloadable CSV file with the leads report.

5. Send Low Conversion Rate Alerts
Sends an email alert if a campaign has a conversion rate of less than 10%.

Endpoint:
GET /api/alerts

Response:
Alerts sent

6. Insert Leads
Adds multiple leads to the database.

Endpoint:
POST /leads

Response:
Returns a JSON array of saved leads.

7. Insert Campaigns
Adds multiple campaigns to the database.

Endpoint:
POST /campaign
