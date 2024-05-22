import { ApiContextTypes } from '../fixtures/ApiContexts';
import { PageContextTypes } from '../fixtures/PageContexts';
import { ActorFixtureTypes } from '../fixtures/Actors';
import { HelperFixtureTypes } from '../fixtures/HelperFixtures';
import { DefaultSalesChannelTypes } from '../fixtures/DefaultSalesChannel';
import { StorefrontPageTypes } from '../page-objects/StorefrontPages';
import { AdministrationPageTypes } from '../page-objects/AdministrationPages';
import { DataFixtureTypes } from '../data-fixtures/DataFixtures';

export interface FixtureTypes extends
    ApiContextTypes,
    PageContextTypes,
    ActorFixtureTypes,
    HelperFixtureTypes,
    DefaultSalesChannelTypes,
    StorefrontPageTypes,
    AdministrationPageTypes,
    DataFixtureTypes {}