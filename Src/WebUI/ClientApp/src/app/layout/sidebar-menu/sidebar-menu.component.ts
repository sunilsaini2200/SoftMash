import {
  Component,
  ContentChildren,
  TemplateRef,
  QueryList,
  ViewChildren,
  OnInit,
} from "@angular/core";
import { AuthorizeService } from "../../../api-authorization/authorize.service";

@Component({
  selector: "app-sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
  styleUrls: ["./sidebar-menu.component.scss"],
})
export class SidebarMenuComponent implements OnInit {
  constructor(private authService: AuthorizeService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.permissions =
          user["http://schemas.eridirect.com/ws/claims/2018/02/permission"] ||
          [];
        this.admin =
          user[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] == "Administrator";
      }
    });

    fetch("/_config/").then((response) => {
      response.json().then((result) => {
        this.baseUrl = result.v1Uri;
      });
    });
  }

  admin: boolean = false;
  permissions: string[] = [];

  baseUrl: string = "";
  isExpanded = false;
  menu = [
    {
      name: "Home",
      text: "Home",
      title: "Home",
      path: "/",
    },
    {
      name: "Operations",
      text: "Operations",
      title: "Operations",
      subMenus: [
        {
          name: "Clients",
          text: "Clients",
          title: "Manage Clients",
          path: "/clients",
        },
        {
          name: "Components",
          text: "Components",
          title: "Manage Components",
          path: "/components",
        },
        {
          name: "Pricing",
          text: "Pricing",
          title: "Manage the Component Pricing for each Client",
          path: "/clients/pricing",
        },
        {
          name: "Scheduling",
          text: "Scheduling",
          title: "Schedule Shipments",
          path: "/scheduling",
        },
        {
          name: "ClientRequirements",
          text: "Client Requirements",
          title: "Client Requirements",
          path: "/requirements/clients/index.aspx",
        },
        {
          name: "ShipmentRequirements",
          text: "Shipment Requirements",
          title: "Shipment Requirements",
          path: "/shipment/ShipmentRequirements.aspx",
        },
        {
          name: "OPOutgoingInventory",
          text: "Outgoing Inventory",
          title: "Outgoing Inventory",
          path: "/inventory/outgoinginventory.aspx",
        },
        {
          name: "Credential",
          text: "Credentials",
          title: "Credentials",
          path: "/credentials/",
        },
        {
          name: "Subscription",
          text: "Subscription",
          title: "Subscription",
          path: "/subscription/",
        },
        {
          name: "ProductUnitReassignment",
          text: "Product Unit Reassignment",
          title: "Product Unit Reassignment",
          path: "/shipment/shipmentproductunitreassignment",
        },
        {
          name: "BatchShipmentReview",
          text: "Batch Shipment Review",
          title: "Batch Shipment Review",
          path: "/shipment/batchshipmentreview",
        },
      ],
    },
    {
      name: "Orders",
      text: "Orders",
      title: "Orders",
      subMenus: [
        {
          name: "OrderView",
          text: "Search",
          title: "Order Search / View",
          path: "/orders/index",
        },
        {
          name: "OrderView",
          text: "Recurring",
          title: "Recurring Orders Search / View",
          path: "/orders/recurring/index",
        },
        {
          name: "OrderCreate",
          text: "Create",
          title: "Order Create",
          path: "/orders/create",
        },
        {
          name: "ExternalImport",
          text: "External Imports",
          title: "External Import",
          path: "/orders/externalimport/index",
        },
        {
          name: "OrderAdmin",
          text: "Administration",
          title: "Order Administration",
          path: "/orders/admin/admin.aspx",
        },
      ],
    },
    {
      name: "Services",
      text: "Services",
      title: "Services",
      subMenus: [
        {
          name: "CreateServiceOrder",
          text: "Create Order",
          title: "Create Service Order",
          path: "/services/createserviceshipment.aspx",
        },
        {
          name: "ServiceSearch",
          text: "Search",
          title: "Service Search",
          path: "/services/",
        },
        {
          name: "PackageAdmin",
          text: "Administration",
          title: "Administration",
          path: "/services/packages.aspx",
        },
      ],
    },
    {
      name: "Logistics",
      text: "Logistics",
      title: "Logistics",
      subMenus: [
        {
          name: "SearchFreightReview",
          text: "Freight Billing Approval A",
          title: "Approve Freight Billing B",
          path: "/logistics/freight/review/index.aspx",
        },
        {
          name: "FreightIndex",
          text: "Freight Companies",
          title: "Freight Companies",
          path: "/logistics/freight/companies/index.aspx",
        },
        {
          name: "DropTrailers",
          text: "Drop Trailers",
          title: "Manage Drop Trailers",
          path: "/logistics/droptrailers",
        },
        {
          name: "FreightLaneBudgets",
          text: "Freight Lane Budgets",
          title: "Freight Lane Budgets",
          path: "/clients/freightlanebudgets.aspx",
        },
        {
          name: "LogisticsAdmin",
          text: "Administration",
          title: "Logistics Administration",
          path: "/logistics/admin",
        },
      ],
    },
    {
      name: "BinTracking",
      text: "Bin Tracking",
      title: "Bin Tracking",
      subMenus: [
        {
          name: "BinTracking",
          text: "Bin Management",
          title: "Bin Management",
          path: "/bintracking/bins/index.aspx",
        },
        {
          name: "BinTracking",
          text: "Order Management",
          title: "Order Management",
          path: "/bintracking/requests/index.aspx",
        },
        {
          name: "BTAdmin",
          text: "Administration",
          title: "Administration",
          path: "/bintracking/admin/index.aspx",
        },
      ],
    },
    {
      name: "Receiving",
      text: "Receiving",
      title: "Receiving",
      subMenus: [
        {
          name: "Unload",
          text: "Unload",
          title: "Unload a Shipment",
          path: "/receiving/unload",
        },
        {
          name: "Load",
          text: "Load Truck",
          title: "Load a Shipment",
          path: "/receiving/load",
        },
        {
          name: "PublicReceiving",
          text: "Public Receiving",
          title: "Manage public receiving shipments",
          path: "/receiving/public",
        },
        {
          name: "OutgoingCommodities",
          text: "Outgoing Commodities",
          title: "Outgoing Commodities",
          path: "/receiving/commodities",
        },
        {
          name: "SerializedItemsImport",
          text: "Serialized Items Import",
          title: "Serialized Items Import",
          path: "/receiving/serializeditemsimport",
        },
      ],
    },
    {
      name: "Warehouse",
      text: "Warehouse",
      title: "Warehouse",
      subMenus: [
        {
          name: "Processing",
          text: "Process Units",
          title: "Process product units.",
          path: "/processing",
        },
        {
          name: "Canceled",
          text: "Canceled Units",
          title: "Create a pallet/unit of canceled material",
          path: "/processing/canceled.aspx",
        },
        {
          name: "AMQualityControl",
          text: "Quality Control",
          title: "Qualtiy Control",
          path: "/qc/index.aspx",
        },
        {
          name: "UnitSearch",
          text: "Unit Search",
          title: "Search for a product unit",
          path: "/productdata/search.aspx",
        },
        {
          name: "UnauthorizedWaste",
          text: "Unauthorized Waste",
          title: "Unauthorized Waste",
          path: "/unauthorizedwaste/unauthorizedwasteproductunitsearch",
        },
        {
          name: "Inventory",
          text: "Inventory",
          title: "Manage warehouse inventory and manage variance",
          path: "/inventory",
        },
        {
          name: "WriteOffIndex",
          text: "Write-Offs",
          title: "Product Unit Write-Off",
          path: "/productdata/writeoff/index.aspx",
        },
      ],
    },
    {
      name: "AssetMgmnt",
      text: "Asset Management",
      title: "Asset Management",
      subMenus: [
        {
          name: "AMDashboard",
          text: "Dashboard",
          title: "AssetManagement Dashboard",
          path: "/am/dashboard.aspx",
        },
        {
          name: "AMRegister",
          text: "Registration",
          title: "Asset Management Registration",
          path: "/am/register/pallet.aspx",
        },
        {
          name: "AMAssetDetails",
          text: "Asset Details",
          title: "Harvest",
          path: "/am/assetdetails/index.aspx",
        },
        {
          name: "AmQuickHarvest",
          text: "Quick Harvest",
          title: "Quick Harvest",
          path: "/am/quickharvest/index.aspx",
        },
        {
          name: "AMRepair",
          text: "Refurbish",
          title: "Repair",
          path: "/am/repair/",
        },
        {
          name: "AMLots",
          text: "Lots",
          title: "Lots",
          path: "/am/lots/index.aspx",
        },
        {
          name: "AMTransfers",
          text: "Transfers",
          title: "Asset Management - Transfers",
          path: "/am/transfer/",
        },
        {
          name: "AMSales",
          text: "Sales",
          title: "Asset Management - Sales",
          path: "/am/sales/",
        },
        {
          name: "AMReturns",
          text: "Returns",
          title: "Search and view RMAs",
          path: "/am/returns/",
        },
        {
          name: "AMShippingDashboard",
          text: "Shipping Dashboard",
          title: "Shipping Dashboard",
          path: "/am/shipping/dashboard",
        },
        {
          name: "AMHolding",
          text: "Holding",
          title: "Asset Management - Holding",
          path: "/am/holding/index.aspx",
        },
        {
          name: "AMEOLPallets",
          text: "EOL Weight",
          title: "Manage the Asset Management EOL bound pallets",
          path: "/am/eol",
        },
        {
          name: "FMVPricing",
          text: "FMV Pricing",
          title: "FMV Pricing",
          path: "/am/fmvpricing/index.aspx",
        },
        {
          name: "AMMasterView",
          text: "Asset Search",
          title: "Search and view this site's assets",
          path: "/am/master/",
        },
        {
          name: "AMERIPallet",
          text: "ERI AM Pallets",
          title: "ERI AM Pallets",
          path: "/am/eripallet/index.aspx",
        },
        {
          name: "AMLoad",
          text: "Load Truck",
          title: "Load Truck",
          path: "/am/load/index.aspx",
        },
        {
          name: "AMAccountIndex",
          text: "Accounts",
          title: "Accounts",
          path: "/am/accounts/index.aspx",
        },
        {
          name: "AMAdmin",
          text: "Administration",
          title: "Asset Management Administration",
          path: "/am/admin/index.aspx",
        },
        {
          name: "AMContainers",
          text: "Containers",
          title: "Containers",
          path: "/am/containers",
        },
        {
          name: "AMRevenueShare",
          text: "Revenue Share",
          title: "Generate AM Sales Revenue Share",
          path: "/am/sales/revenueshares",
        },
        {
          name: "AMProcessQueue",
          text: "AM Process Queue",
          title: "Process pending AM Process Shipments",
          path: "/am/amprocessqueue",
        },
        {
          name: "AMMove",
          text: "Move Inventory",
          title: "Asset Management - Move",
          path: "/am/master/move",
        },
      ],
    },
    {
      name: "HarvestMgmnt",
      text: "Harvest",
      title: "Harvest Management",
      subMenus: [
        {
          name: "AMHarvestParts",
          text: "Parts",
          title: "Harvest Parts",
          path: "/harvest/parts",
        },
        {
          name: "AMHarvestScrap",
          text: "Scrap",
          title: "Harvest Scrap",
          path: "/am/harvestscrap/index.aspx",
        },
        {
          name: "AMHarvestLot",
          text: "Lot",
          title: "Harvest Lot",
          path: "/am/harvestlot/index.aspx",
        },
        {
          name: "AMHarvestERIPallet",
          text: "ERI AM Pallets",
          title: "Harvest ERI AM Pallets",
          path: "/harvest/eripallets",
        },
        {
          name: "AMHarvestProducts",
          text: "Products",
          title: "Products",
          path: "/harvest/products",
        },
        {
          name: "AMPickListSale",
          text: "Upload Pick List",
          title: "Harvest Sale From Pickup List",
          path: "/am/harvestsales/uploadpicklist.aspx",
        },
        {
          name: "HarvestAdmin",
          text: "Administration",
          title: "Harvest Administration",
          path: "/harvest/admin/index.aspx",
        },
      ],
    },
    {
      name: "Reports",
      text: "Reports",
      title: "Reports",
      path: "/reports",
    },
    {
      name: "Sales",
      text: "Sales",
      title: "Sales",
      subMenus: [
        {
          name: "Accounts",
          text: "Accounts",
          title: "Add/View accounts",
          path: "/sales/accounts/index.aspx",
        },
        {
          name: "SalesRepGoals",
          text: "Goals",
          title: "Add/Edit goals for a selected sales rep",
          path: "/sales/goals/index.aspx",
        },
      ],
    },
    {
      name: "OEM",
      text: "OEM",
      title: "OEM",
      subMenus: [
        {
          name: "OEMInvoices",
          text: "Invoices",
          title: "Manage the system's OEM Invoices",
          path: "/clients/oem/invoices",
        },
        {
          name: "OEMCollectors",
          text: "Collectors",
          title: "Manage Collectors",
          path: "/clients/oem/collectors",
        },
        {
          name: "OEMRecyclers",
          text: "Recyclers",
          title: "Manage Recyclers",
          path: "/clients/oem/Recyclers",
        },
        {
          name: "OEMManufacturers",
          text: "Manufacturers",
          title: "Manage Manufacturers",
          path: "/clients/oem/manufacturers",
        },
        {
          name: "OEMInvoiceQuick",
          text: "Manage Invoices and Components",
          title: "Manage Invoices and Components",
          path: "/clients/oem/invoices/quick/index.aspx",
        },
        {
          name: "OEMDecisionTable",
          text: "Decision Table",
          title: "OEM Decision Table",
          path: "/clients/oem/invoices/decisiontable.aspx",
        },
        {
          name: "OEMAdmin",
          text: "Administration",
          title: "Administer the OEM module",
          path: "/clients/oem/admin.aspx",
        },
      ],
    },
    {
      name: "NOTIFICATION",
      text: "NOTIFICATION",
      title: "NOTIFICATION",
      subMenus: [
        {
          name: "OEMInvoices",
          text: "Invoices",
          title: "Manage the system's OEM Invoices",
          path: "/clients/oem/invoices",
        },
      ],
    },
    {
      name: "Accounting",
      text: "Accounting",
      title: "Accounting",
      subMenus: [
        {
          name: "Invoicing",
          text: "Invoicing",
          title: "Create, Edit or View Invoices",
          path: "/invoicing",
        },
        {
          name: "InvoicingApproval",
          text: "Invoice Approval",
          title: "Invoice Approval",
          path: "/invoicing/approval.aspx",
        },
        {
          name: "Payments",
          text: "Payments",
          title: "Manage incoming or outgoing payments",
          path: "/invoicing/payments",
        },
        {
          name: "NAVRecords",
          text: "NAV Records",
          title: "NAV Records",
          path: "/invoicing/nav.aspx",
        },
        {
          name: "NAVTests",
          text: "NAV Testing",
          title: "NAV Testing",
          path: "/invoicing/navtests.aspx",
        },
        {
          name: "PaymentsMail",
          text: "Mail Payments",
          title: "Mail payments in the system",
          path: "/invoicing/payments/mail.aspx",
        },
      ],
    },
    {
      name: "Compliance",
      text: "Compliance",
      title: "Compliance",
      subMenus: [
        {
          name: "CACEWClaim",
          text: "CEW Claims",
          title: "Create or Edit California CEW Claims.",
          path: "/compliance/ca_cewclaims",
        },
        {
          name: "CompReviewSearch",
          text: "Search",
          title: "Search for Compliance Review",
          path: "/compliance/review",
        },
        {
          name: "ComplianceFormDashboard",
          text: "Form Dashboard",
          title: "Form Dashboard",
          path: "/compliance/forms/dashboard.aspx",
        },
        {
          name: "ViewFormResponse",
          text: "Form Responses",
          title: "Form Responses",
          path: "/compliance/forms/response/index.aspx",
        },
        {
          name: "ComplianceFormAdmin",
          text: "Form Admin",
          title: "Form Administration",
          path: "/compliance/forms/index.aspx",
        },
      ],
    },
    {
      name: "Admin",
      text: "System Admin",
      title: "System Admin",
      subMenus: [
        {
          name: "Sites",
          text: "Sites",
          title: "Manage the information for each ERI Location",
          path: "/admin/sites.aspx",
        },
        {
          name: "ReceivingTypes",
          text: "Receiving Types",
          title: "Add New Receiving Types",
          path: "/receivingtypes",
        },
        {
          name: "Settings",
          text: "My Settings",
          title: "Change Your Personal Settings",
          path: "/settings",
        },
        {
          name: "Employees",
          text: "Employees",
          title: "Manage Employees",
          path: "/employees",
        },
        {
          name: "Projects",
          text: "Projects",
          title: "Projects",
          path: "/projects",
        },
        {
          name: "Tasks",
          text: "Tasks",
          title: "Tasks",
          path: "/tasks",
        },
        {
          name: "ComplianceFormAdmin",
          text: "Forms",
          title: "Forms",
          path: "/admin/forms/index.aspx",
        },
      ],
    },
    {
      name: "Logs",
      text: "System Logs",
      title: "View the system logs",
      subMenus: [
        {
          name: "Exceptions",
          text: "Exceptions",
          title:
            "View a log of all system errors and the users that encountered them",
          path: "/logs/exceptions.aspx",
        },
        {
          name: "Changes",
          text: "Changes",
          title: "View a log of all changes to the system and who made them",
          path: "/logs/changes.aspx",
        },
        {
          name: "LoggedIn",
          text: "Logged In",
          title: "View a list of all currently logged in users",
          path: "/logs/logins.aspx",
        },
      ],
    },
    {
      name: "ReleaseNotes",
      text: "Release Notes",
      title: "Release Notes",
      path: "/ReleaseNotes",
    },
    {
      name: "ProductCatalog",
      text: "Product Catalog (Beta)",
      title: "Product Catalog",
      subMenus: [
        {
          name: "Categories",
          text: "Categories",
          title: "Manage product catalog categories",
          path: "/catalog/category",
        },
        {
          name: "Features",
          text: "Features",
          title: "Manage product catalog features",
          path: "/catalog/feature",
        },
        {
          name: "Manufacturers",
          text: "Manufacturers",
          title: "Manage product catalog manufacturers",
          path: "/catalog/manufacturer",
        },
        {
          name: "Products",
          text: "Products",
          title: "Manage product catalog products",
          path: "/catalog/product",
        },
      ],
    },
  ];
  expansion: any = {};

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  kebabCase(string: string): string {
    return string
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase();
  }
}
