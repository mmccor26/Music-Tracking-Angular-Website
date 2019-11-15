import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemanagerComponent } from './sitemanager.component';

describe('SitemanagerComponent', () => {
  let component: SitemanagerComponent;
  let fixture: ComponentFixture<SitemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
