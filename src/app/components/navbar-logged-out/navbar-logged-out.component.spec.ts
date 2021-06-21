import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLoggedOutComponent } from './navbar-logged-out.component';

describe('NavbarLoggedOutComponent', () => {
  let component: NavbarLoggedOutComponent;
  let fixture: ComponentFixture<NavbarLoggedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLoggedOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLoggedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
